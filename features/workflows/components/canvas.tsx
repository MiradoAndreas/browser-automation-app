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
  type OnConnect,
  NodeTypes,
} from "@xyflow/react"
import { StepNode } from "@/features/workflows/components/step-node"
import type { StepNodeType } from "@/features/workflows/nodes/node-registry"
import "@xyflow/react/dist/style.css"

const subscribe = () => () => {}
const getSnapshot = () => true
const getServerSnapshot = () => false

const nodeTypes: NodeTypes = {
  step: StepNode,
}

const initialNodes: StepNodeType[] = [
  {
    id: "start",
    type: "step",
    position: {
      x: 0,
      y: 0,
    },
    data: {
      type: "start",
      kind: "trigger",
      title: "Start",
      values: {},
    },
  },
]

const initialEdges: Edge[] = []

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
        nodeTypes={nodeTypes}
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
