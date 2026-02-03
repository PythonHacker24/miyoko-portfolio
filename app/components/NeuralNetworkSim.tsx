"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Grid } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";
import { Play, Square } from "lucide-react";

// Helper for sigmoid
const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));

type Weights = {
    wIH: number[][]; // 2x3 matrix
    wHO: number[];   // 3x1 vector
    bH: number[];    // 3 biases
    bO: number;      // 1 output bias
};

const forward = (x1: number, x2: number, weights: Weights) => {
    // Hidden layer
    const h = weights.wIH[0].map((_, i) => {
        const sum = x1 * weights.wIH[0][i] + x2 * weights.wIH[1][i] + weights.bH[i];
        return sigmoid(sum);
    });

    // Output layer
    const outSum = h.reduce((acc, val, i) => acc + val * weights.wHO[i], 0) + weights.bO;
    return sigmoid(outSum);
};

const Surface = ({ weights }: { weights: Weights }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    const segments = 50;

    const geometry = useMemo(() => {
        return new THREE.PlaneGeometry(12, 12, segments, segments);
    }, [segments]);

    useFrame(() => {
        if (!meshRef.current) return;
        const positions = meshRef.current.geometry.attributes.position;
        for (let i = 0; i < positions.count; i++) {
            const x = positions.getX(i);
            const y = positions.getY(i);
            const inputX = x / 3;
            const inputY = y / 3;
            const z = forward(inputX, inputY, weights) * 5 - 2.5;
            positions.setZ(i, z);
        }
        positions.needsUpdate = true;
    });

    return (
        <mesh ref={meshRef} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]}>
            <meshStandardMaterial
                color="#3b82f6"
                wireframe
                transparent
                opacity={0.4}
                side={THREE.DoubleSide}
                emissive="#3b82f6"
                emissiveIntensity={0.2}
            />
        </mesh>
    );
};

export function NeuralNetworkSim() {
    const [wIH, setWIH] = useState([[1, 1, 1], [-1, -1, -1]]);
    const [wHO, setWHO] = useState([1, -1, 1]);
    const [bH, setBH] = useState([0, 0, 0]);
    const [bO, setBO] = useState(0);
    const [isAuto, setIsAuto] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const weights: Weights = { wIH, wHO, bH, bO };

    // Auto-simulation logic
    useEffect(() => {
        if (!isAuto || !isOpen) return;

        const interval = setInterval(() => {
            setWIH(prev => prev.map(row => row.map(v => {
                const delta = (Math.random() - 0.5) * 0.1;
                return Math.max(-3, Math.min(3, v + delta));
            })));
            setWHO(prev => prev.map(v => {
                const delta = (Math.random() - 0.5) * 0.1;
                return Math.max(-3, Math.min(3, v + delta));
            }));
        }, 100);

        return () => clearInterval(interval);
    }, [isAuto, isOpen]);

    const updateWeightIH = (i: number, j: number, val: number) => {
        const newW = [...wIH];
        newW[i] = [...newW[i]];
        newW[i][j] = val;
        setWIH(newW);
    };

    const updateWeightHO = (i: number, val: number) => {
        const newW = [...wHO];
        newW[i] = val;
        setWHO(newW);
    };

    return (
        <div className="mb-4 w-full flex justify-start py-6">
            {!isOpen ? (
                <button
                    onClick={() => setIsOpen(true)}
                    className="group flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-all duration-300"
                >
                    <span className="text-sm sm:text-base underline underline-offset-8 decoration-gray-200 dark:decoration-zinc-800 group-hover:decoration-blue-500 transition-all">
                        side feature: neural landscape
                    </span>
                </button>
            ) : (
                <motion.div
                    initial={{ opacity: 0, scale: 0.98, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="w-full max-w-5xl overflow-hidden rounded-2xl border border-gray-100 bg-white/40 p-6 backdrop-blur-md dark:border-zinc-800/50 dark:bg-black/40"
                >
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 dark:text-gray-500">
                                Neural Landscape
                            </h3>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setIsAuto(!isAuto)}
                                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-all ${isAuto
                                    ? "bg-blue-500/10 text-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.2)]"
                                    : "bg-gray-100 text-gray-400 dark:bg-zinc-800/50 hover:text-gray-600 dark:hover:text-gray-200"
                                    }`}
                            >
                                {isAuto ? <Square size={10} fill="currentColor" /> : <Play size={10} fill="currentColor" />}
                                {isAuto ? "Stop" : "Auto"}
                            </button>
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    setIsAuto(false);
                                }}
                                className="rounded-full bg-gray-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:bg-zinc-800/50 hover:text-red-500 transition-all"
                            >
                                Close
                            </button>
                        </div>
                    </div>

                    {/* Top: 3D Field (Full Width) */}
                    <div className="relative h-[300px] w-full cursor-grab active:cursor-grabbing">
                        <Canvas shadows gl={{ alpha: true }}>
                            <PerspectiveCamera makeDefault position={[10, 8, 10]} fov={35} />
                            <OrbitControls enableZoom={false} autoRotate={!isAuto} autoRotateSpeed={0.5} />
                            <ambientLight intensity={0.7} />
                            <pointLight position={[10, 10, 10]} intensity={1.5} />
                            <Surface weights={weights} />
                            <Grid
                                infiniteGrid
                                fadeDistance={25}
                                fadeStrength={5}
                                cellColor="#888"
                                sectionColor="#444"
                                position={[0, -2.6, 0]}
                            />
                        </Canvas>
                        <div className="pointer-events-none absolute bottom-4 left-0 right-0 flex justify-center text-[9px] font-mono text-gray-400/60 uppercase tracking-widest">
                            Non-linear mapping: R² → R¹
                        </div>
                    </div>

                    {/* Bottom: Side by Side Diagram and Sliders */}
                    <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">

                        {/* Left: NN Diagram */}
                        <div className="relative flex aspect-[4/3] w-full items-center justify-center rounded-xl bg-gray-50/30 dark:bg-zinc-900/20 p-4 border border-gray-100/50 dark:border-zinc-800/30">
                            <svg viewBox="0 0 400 300" className="h-full w-full">
                                {/* Connections Input -> Hidden */}
                                {[0, 1].map(i => [0, 1, 2].map(j => (
                                    <motion.line
                                        key={`ih-${i}-${j}`}
                                        x1="80" y1={100 + i * 100}
                                        x2="200" y2={50 + j * 100}
                                        stroke={wIH[i][j] >= 0 ? "#3b82f6" : "#ef4444"}
                                        strokeWidth={Math.abs(wIH[i][j]) * 1.5 + 0.5}
                                        animate={{
                                            strokeWidth: Math.abs(wIH[i][j]) * 1.5 + 0.5,
                                            stroke: wIH[i][j] >= 0 ? "#3b82f6" : "#ef4444"
                                        }}
                                    />
                                )))}
                                {/* Connections Hidden -> Output */}
                                {[0, 1, 2].map(j => (
                                    <motion.line
                                        key={`ho-${j}`}
                                        x1="200" y1={50 + j * 100}
                                        x2="320" y2="150"
                                        stroke={wHO[j] >= 0 ? "#3b82f6" : "#ef4444"}
                                        strokeWidth={Math.abs(wHO[j]) * 1.5 + 0.5}
                                        animate={{
                                            strokeWidth: Math.abs(wHO[j]) * 1.5 + 0.5,
                                            stroke: wHO[j] >= 0 ? "#3b82f6" : "#ef4444"
                                        }}
                                    />
                                ))}

                                {/* Node Layers */}
                                {[0, 1].map(i => (
                                    <g key={`in-${i}`}>
                                        <circle cx="80" cy={100 + i * 100} r="12" className="fill-white stroke-blue-500/50 stroke-1 dark:fill-zinc-900" />
                                        <text x="80" y={103 + i * 100} textAnchor="middle" className="fill-blue-500/80 font-mono text-[9px] font-bold">X{i + 1}</text>
                                    </g>
                                ))}
                                {[0, 1, 2].map(j => (
                                    <g key={`hid-${j}`}>
                                        <circle cx="200" cy={50 + j * 100} r="12" className="fill-white stroke-indigo-500/50 stroke-1 dark:fill-zinc-900" />
                                        <text x="200" y={53 + j * 100} textAnchor="middle" className="fill-indigo-500/80 font-mono text-[9px] font-bold">H{j + 1}</text>
                                    </g>
                                ))}
                                <circle cx="320" cy="150" r="15" className="fill-white stroke-blue-600/50 stroke-1 dark:fill-zinc-900" />
                                <text x="320" y="153" textAnchor="middle" className="fill-blue-600/80 font-mono text-[9px] font-bold">Y</text>
                            </svg>
                        </div>

                        {/* Right: Sliders */}
                        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                            <div className="space-y-3">
                                <h4 className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Input Weights</h4>
                                {[0, 1].map(i => [0, 1, 2].map(j => (
                                    <div key={`s-ih-${i}-${j}`} className="space-y-1">
                                        <div className="flex justify-between text-[8px] font-mono text-gray-400">
                                            <span>w{i + 1}{j + 1}</span>
                                            <span className={wIH[i][j] >= 0 ? "text-blue-500" : "text-red-500"}>{wIH[i][j].toFixed(2)}</span>
                                        </div>
                                        <input
                                            type="range" min="-3" max="3" step="0.01"
                                            value={wIH[i][j]}
                                            disabled={isAuto}
                                            onChange={(e) => updateWeightIH(i, j, parseFloat(e.target.value))}
                                            className="h-1 w-full cursor-pointer appearance-none rounded-full bg-gray-200 dark:bg-zinc-800 accent-blue-500 disabled:opacity-50"
                                        />
                                    </div>
                                )))}
                            </div>
                            <div className="space-y-3">
                                <h4 className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Hidden Weights</h4>
                                {[0, 1, 2].map(j => (
                                    <div key={`s-ho-${j}`} className="space-y-1">
                                        <div className="flex justify-between text-[8px] font-mono text-gray-400">
                                            <span>v{j + 1}</span>
                                            <span className={wHO[j] >= 0 ? "text-indigo-500" : "text-red-500"}>{wHO[j].toFixed(2)}</span>
                                        </div>
                                        <input
                                            type="range" min="-3" max="3" step="0.01"
                                            value={wHO[j]}
                                            disabled={isAuto}
                                            onChange={(e) => updateWeightHO(j, parseFloat(e.target.value))}
                                            className="h-1 w-full cursor-pointer appearance-none rounded-full bg-gray-200 dark:bg-zinc-800 accent-indigo-500 disabled:opacity-50"
                                        />
                                    </div>
                                ))}
                                <div className="pt-2 border-t border-gray-100 dark:border-zinc-800">
                                    <h4 className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Bias</h4>
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-[8px] font-mono text-gray-400">
                                            <span>output_b</span>
                                            <span className="text-gray-500">{bO.toFixed(2)}</span>
                                        </div>
                                        <input
                                            type="range" min="-3" max="3" step="0.01"
                                            value={bO}
                                            disabled={isAuto}
                                            onChange={(e) => setBO(parseFloat(e.target.value))}
                                            className="h-1 w-full cursor-pointer appearance-none rounded-full bg-gray-200 dark:bg-zinc-800 accent-gray-500 disabled:opacity-50"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
