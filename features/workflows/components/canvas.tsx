"use client"

import { useCallback, useSyncExternalStore } from "react"
import { useTheme } from "next-themes"
import {
  addEdge,
  Controls,
  MiniMap,
  ReactFlow,
  useEdgesState,
  useNodesState,
  type Edge,
  ConnectionLineType,
  type Node,
  type OnConnect,
} from "@xyflow/react"

import "@xyflow/react/dist/style.css"

const subscribe = () => () => {}
const getSnapshot = () => true
const getServerSnapshot = () => false

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
  const { resolvedTheme } = useTheme()
  const mounted = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  )
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
        colorMode={mounted && resolvedTheme === "dark" ? "dark" : "light"}
        connectionLineType={ConnectionLineType.SmoothStep}
        connectionLineStyle={{ stroke: "var(--border)" }}
        defaultEdgeOptions={{
          type: "smoothstep",
          style: {
            stroke: "var(--border)",
          },
        }}
        style={
          {
            "--xy-background-color": "var(--background)",
            "--xy-edge-stroke-width": 2,
            "--xy-connectionline-stroke-width": 2,
          } as React.CSSProperties
        }
        maxZoom={1.5}
      >
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  )
}
