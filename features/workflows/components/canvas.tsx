"use client"

import { useCallback } from "react"
import {
  addEdge,
  Background,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
  type Edge,
  type Node,
  type OnConnect,
} from "@xyflow/react"

import "@xyflow/react/dist/style.css"

const initialNodes: Node[] = [
  {
    id: "start",
    type: "input",
    position: { x: 0, y: 0 },
    data: { label: "Start" },
  },
  {
    id: "open-page",
    position: { x: 0, y: 120 },
    data: { label: "Open a page" },
  },
  {
    id: "finish",
    type: "output",
    position: { x: 0, y: 240 },
    data: { label: "Finish" },
  },
]

const initialEdges: Edge[] = [
  { id: "start-open-page", source: "start", target: "open-page" },
  { id: "open-page-finish", source: "open-page", target: "finish" },
]

export function Canvas() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges)
  const onConnect = useCallback<OnConnect>(
    (connection) => setEdges((edges) => addEdge(connection, edges)),
    [setEdges]
  )

  return (
    <div className="size-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        colorMode="system"
      >
        <Background />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  )
}
