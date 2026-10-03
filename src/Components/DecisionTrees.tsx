import {
  useState,
  type CSSProperties,
  type PointerEvent,
  type WheelEvent,
} from "react";
import { Chessboard } from "react-chessboard";

type TreeNode = {
  id: string;
  x: number;
  y: number;
  title: string;
  move: string;
  description: string;
  fen: string;
  children?: string[];
};

const treeNodes: TreeNode[] = [
  {
    id: "start",
    x: 1000,
    y: 90,
    title: "Starting position",
    move: "Start",
    description: "The starting position before the first move.",
    fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    children: ["e4", "d4"],
  },
  {
    id: "e4",
    x: 500,
    y: 300,
    title: "1. e4",
    move: "1. e4",
    description:
      "White immediately claims space in the centre and opens lines for the queen and bishop.",
    fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1",
    children: ["e4e5", "e4c5"],
  },
  {
    id: "d4",
    x: 1500,
    y: 300,
    title: "1. d4",
    move: "1. d4",
    description:
      "White establishes a strong central pawn and prepares a different family of opening structures.",
    fen: "rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1",
  },
  {
    id: "e4e5",
    x: 280,
    y: 510,
    title: "Open Game family",
    move: "1. e4 e5",
    description:
      "A classical response to 1.e4 that can lead to many different openings and positions.",
    fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
    children: ["nf3", "bc4", "bb5"],
  },
  {
    id: "e4c5",
    x: 720,
    y: 510,
    title: "Sicilian family",
    move: "1. e4 c5",
    description:
      "An asymmetrical response to 1.e4 with many different branches.",
    fen: "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2",
  },
  {
    id: "nf3",
    x: 100,
    y: 735,
    title: "Develop the knight",
    move: "2. Nf3",
    description:
      "White develops a piece, pressures e5 and prepares to castle.",
    fen: "rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2",
  },
  {
    id: "bc4",
    x: 390,
    y: 735,
    title: "Bishop development",
    move: "2. Bc4",
    description:
      "White develops the bishop actively and puts pressure toward the kingside.",
    fen: "rnbqkbnr/pppp1ppp/8/4p3/2B1P3/8/PPPP1PPP/RNBQK1NR b KQkq - 1 2",
  },
  {
    id: "bb5",
    x: 680,
    y: 735,
    title: "Bishop to b5",
    move: "2. Bb5",
    description:
      "White develops the bishop to b5, creating pressure and preparing different strategic ideas.",
    fen: "rnbqkbnr/pppp1ppp/8/1B2p3/4P3/8/PPPP1PPP/RNBQK1NR b KQkq - 1 2",
  },
];

const nodeMap = new Map(treeNodes.map((node) => [node.id, node]));

const edges = treeNodes
  .flatMap((node) =>
    (node.children ?? []).map((childId) => {
      const child = nodeMap.get(childId);

      if (!child) {
        return null;
      }

      return {
        from: node,
        to: child,
      };
    }),
  )
  .filter(Boolean) as { from: TreeNode; to: TreeNode }[];

function OpeningNode({
  node,
  selected,
  onSelect,
}: {
  node: TreeNode;
  selected: boolean;
  onSelect: (node: TreeNode) => void;
}) {
  return (
    <button
      onPointerDown={(event) => event.stopPropagation()}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(node);
      }}
      style={{
        position: "absolute",
        left: node.x,
        top: node.y,
        width: "190px",
        minHeight: "92px",
        transform: "translate(-50%, -50%)",
        padding: "14px",
        borderRadius: "14px",
        border: selected
          ? "2px solid #d7c39a"
          : "1px solid rgba(255,255,255,0.12)",
        background: selected ? "#34302a" : "#242424",
        color: "#ffffff",
        cursor: "pointer",
        textAlign: "left",
        boxShadow: selected
          ? "0 0 0 3px rgba(215,195,154,0.12), 0 8px 20px rgba(0,0,0,0.25)"
          : "0 6px 16px rgba(0,0,0,0.2)",
        transition: "transform 0.15s ease, border-color 0.15s ease",
      }}
    >
      <div
        style={{
          fontSize: "11px",
          color: "#b9b9b9",
          marginBottom: "5px",
        }}
      >
        {node.move}
      </div>

      <div
        style={{
          fontSize: "14px",
          fontWeight: 700,
          lineHeight: 1.25,
        }}
      >
        {node.title}
      </div>
    </button>
  );
}

export function DecisionTrees() {
  const [selectedId, setSelectedId] = useState("e4e5");
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({
    x: 0,
    y: 0,
    panX: 0,
    panY: 0,
  });

  const selected = nodeMap.get(selectedId) ?? treeNodes[0];

  const selectedChildren = selected.children
    ?.map((id) => nodeMap.get(id))
    .filter(Boolean) as TreeNode[] | undefined;

  const moveNumber = selected.move.match(/\d+/)?.[0] ?? "1";

  const isWhiteToMove = selected.fen.split(" ")[1] === "w";

  const transpositions =
    selected.id === "nf3"
      ? [
          {
            label: "Another route to the same position",
            nodeId: "nf3",
          },
        ]
      : [];

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const direction = event.deltaY < 0 ? 0.1 : -0.1;

    setZoom((current) =>
      Math.min(
        1.6,
        Math.max(0.55, Number((current + direction).toFixed(2))),
      ),
    );
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    setDragging(true);

    setDragStart({
      x: event.clientX,
      y: event.clientY,
      panX: pan.x,
      panY: pan.y,
    });

    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging) {
      return;
    }

    setPan({
      x: dragStart.panX + event.clientX - dragStart.x,
      y: dragStart.panY + event.clientY - dragStart.y,
    });
  };

  const stopDragging = (event: PointerEvent<HTMLDivElement>) => {
    setDragging(false);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const selectNode = (node: TreeNode) => {
    setSelectedId(node.id);
  };

  const resetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const jumpToNode = (nodeId: string) => {
    const node = nodeMap.get(nodeId);

    if (!node) {
      return;
    }

    setSelectedId(node.id);
  };

  const openMoveTrainer = () => {
    alert("Move Trainer will open this position here.");
  };

  const openOpeningExplorer = () => {
    alert("Opening Explorer will open from this position here.");
  };

  const pageStyle: CSSProperties = {
  minHeight: "100%",
  width: "100%",
  boxSizing: "border-box",
  marginLeft: 0,
  padding: "24px 16px",
  background: "#171a1c",
  color: "#ffffff",
};

  return (
    <div style={pageStyle}>
      <div
        style={{
          width: "100%",
          maxWidth: "none",
          margin: "0",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <h1
            style={{
              margin: 0,
              fontSize: "28px",
              fontWeight: 700,
            }}
          >
            Decision Trees
          </h1>

          <p
            style={{
              margin: "8px 0 0",
              color: "#8e8e8e",
              fontSize: "15px",
            }}
          >
            Explore how opening positions branch, connect and transpose.
          </p>
        </div>

        <div
          style={{
            width: "100%",
            background: "#171717",
            borderRadius: "20px",
            overflow: "hidden",
            boxShadow: "0 10px 35px rgba(0,0,0,0.12)",
          }}
        >
          <div
            style={{
              height: "58px",
              padding: "0 16px 0 18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              borderBottom: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div>
              <div
                style={{
                  color: "#ffffff",
                  fontSize: "14px",
                  fontWeight: 700,
                }}
              >
                Opening map
              </div>

              <div
                style={{
                  color: "#8e8e8e",
                  fontSize: "11px",
                  marginTop: "2px",
                }}
              >
                Explore the position tree
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <button
                onClick={() =>
                  setZoom((current) =>
                    Math.max(
                      0.55,
                      Number((current - 0.1).toFixed(2)),
                    ),
                  )
                }
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "#242424",
                  color: "#ffffff",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
              >
                −
              </button>

              <button
                onClick={resetView}
                style={{
                  height: "34px",
                  padding: "0 10px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "#242424",
                  color: "#bdbdbd",
                  cursor: "pointer",
                  fontSize: "11px",
                }}
              >
                Reset
              </button>

              <button
                onClick={() =>
                  setZoom((current) =>
                    Math.min(
                      1.6,
                      Number((current + 0.1).toFixed(2)),
                    ),
                  )
                }
                style={{
                  width: "34px",
                  height: "34px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.1)",
                  background: "#242424",
                  color: "#ffffff",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
              >
                +
              </button>
            </div>
          </div>

          <div
            onWheel={handleWheel}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={stopDragging}
            onPointerCancel={stopDragging}
            style={{
              height: "680px",
              width: "100%",
              overflow: "hidden",
              position: "relative",
              touchAction: "none",
              overscrollBehavior: "contain",
              cursor: dragging ? "grabbing" : "grab",
              userSelect: "none",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: "2000px",
                height: "1120px",
                transform: `translate(calc(-50% + ${pan.x}px), calc(-50% + ${pan.y}px)) scale(${zoom})`,
                transformOrigin: "center center",
              }}
            >
              <svg
                width="2000"
                height="1120"
                style={{
                  position: "absolute",
                  inset: 0,
                  pointerEvents: "none",
                  overflow: "visible",
                }}
              >
                {edges.map(({ from, to }) => {
                  const startX = from.x;
                  const startY = from.y + 46;
                  const endX = to.x;
                  const endY = to.y - 46;

                  const middleY =
                    startY + (endY - startY) / 2;

                  return (
                    <path
                      key={`${from.id}-${to.id}`}
                      d={`M ${startX} ${startY} C ${startX} ${middleY}, ${endX} ${middleY}, ${endX} ${endY}`}
                      fill="none"
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="2"
                    />
                  );
                })}
              </svg>

              {treeNodes.map((node) => (
                <OpeningNode
                  key={node.id}
                  node={node}
                  selected={node.id === selected.id}
                  onSelect={selectNode}
                />
              ))}
            </div>

            <div
              style={{
                position: "absolute",
                left: "18px",
                bottom: "16px",
                padding: "8px 10px",
                borderRadius: "8px",
                background: "rgba(0,0,0,0.55)",
                color: "#9d9d9d",
                fontSize: "11px",
                pointerEvents: "none",
              }}
            >
              Drag to move · Scroll to zoom
            </div>
          </div>

          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              padding: "24px",
              background: "#1d1d1d",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "1100px",
                margin: "0 auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "stretch",
                  gap: "28px",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    minWidth: 0,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      color: "#999999",
                      fontSize: "11px",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginBottom: "8px",
                    }}
                  >
                    Selected position
                  </div>

                  <h2
                    style={{
                      margin: 0,
                      color: "#ffffff",
                      fontSize: "22px",
                      lineHeight: 1.25,
                    }}
                  >
                    {selected.title}
                  </h2>

                  <div
                    style={{
                      marginTop: "7px",
                      color: "#d4c29f",
                      fontSize: "14px",
                      fontWeight: 600,
                    }}
                  >
                    {selected.move}
                  </div>

                  <p
                    style={{
                      margin: "12px 0 0",
                      color: "#b5b5b5",
                      fontSize: "14px",
                      lineHeight: 1.6,
                      maxWidth: "650px",
                    }}
                  >
                    {selected.description}
                  </p>
                </div>

                <div
                  style={{
                    width: "310px",
                    flexShrink: 0,
                    display: "flex",
                    gap: "10px",
                    alignItems: "stretch",
                  }}
                >
                  <div
                    style={{
                      width: "220px",
                      background: "#101010",
                      borderRadius: "14px",
                      padding: "7px",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Chessboard
                      options={{
                        position: selected.fen,
                        boardStyle: {
                          borderRadius: "7px",
                          overflow: "hidden",
                        },
                      }}
                    />
                  </div>

                  <div
                    style={{
                      width: "80px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        minHeight: "72px",
                        padding: "12px",
                        borderRadius: "12px",
                        background: "#222222",
                        border:
                          "1px solid rgba(255,255,255,0.07)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          color: "#858585",
                          fontSize: "9px",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        Move
                      </div>

                      <div
                        style={{
                          color: "#ffffff",
                          fontSize: "17px",
                          fontWeight: 700,
                          marginTop: "5px",
                        }}
                      >
                        {moveNumber}
                      </div>
                    </div>

                    <div
                      style={{
                        flex: 1,
                        minHeight: "72px",
                        padding: "12px",
                        borderRadius: "12px",
                        background: "#222222",
                        border:
                          "1px solid rgba(255,255,255,0.07)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          color: "#858585",
                          fontSize: "9px",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        Turn
                      </div>

                      <div
                        style={{
                          color: "#ffffff",
                          fontSize: "12px",
                          fontWeight: 700,
                          marginTop: "5px",
                          lineHeight: 1.2,
                        }}
                      >
                        {isWhiteToMove ? "White" : "Black"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              padding: "28px 24px 32px",
              background: "#171717",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "1100px",
                margin: "0 auto",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "28px",
                  marginBottom: "28px",
                }}
              >
                <div>
                  <div
                    style={{
                      color: "#ffffff",
                      fontSize: "15px",
                      fontWeight: 700,
                      marginBottom: "10px",
                    }}
                  >
                    Common continuations
                  </div>

                  {selectedChildren && selectedChildren.length > 0 ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      {selectedChildren.map((child) => (
                        <button
                          key={child.id}
                          onClick={() => jumpToNode(child.id)}
                          style={{
                            width: "100%",
                            padding: "13px 14px",
                            borderRadius: "10px",
                            border:
                              "1px solid rgba(255,255,255,0.08)",
                            background: "#222222",
                            color: "#ffffff",
                            cursor: "pointer",
                            textAlign: "left",
                          }}
                        >
                          <span
                            style={{
                              color: "#d4c29f",
                              fontWeight: 700,
                              marginRight: "10px",
                            }}
                          >
                            {child.move}
                          </span>

                          <span style={{ color: "#d0d0d0" }}>
                            {child.title}
                          </span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div
                      style={{
                        color: "#858585",
                        fontSize: "13px",
                      }}
                    >
                      No branches have been added here yet.
                    </div>
                  )}
                </div>

                <div>
                  <div
                    style={{
                      color: "#ffffff",
                      fontSize: "15px",
                      fontWeight: 700,
                      marginBottom: "10px",
                    }}
                  >
                    Transpositions
                  </div>

                  {transpositions.length > 0 ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      {transpositions.map((transposition) => (
                        <button
                          key={transposition.nodeId}
                          onClick={() =>
                            jumpToNode(transposition.nodeId)
                          }
                          style={{
                            width: "100%",
                            padding: "13px 14px",
                            borderRadius: "10px",
                            border:
                              "1px solid rgba(255,255,255,0.08)",
                            background: "#222222",
                            color: "#d0d0d0",
                            cursor: "pointer",
                            textAlign: "left",
                          }}
                        >
                          ↔ {transposition.label}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div
                      style={{
                        padding: "14px",
                        borderRadius: "10px",
                        background: "#222222",
                        color: "#858585",
                        fontSize: "13px",
                      }}
                    >
                      No known transpositions for this position yet.
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div
                  style={{
                    color: "#ffffff",
                    fontSize: "15px",
                    fontWeight: 700,
                    marginBottom: "10px",
                  }}
                >
                  Continue learning
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  <button
                    onClick={openMoveTrainer}
                    style={{
                      flex: "1 1 220px",
                      padding: "14px 16px",
                      borderRadius: "10px",
                      border:
                        "1px solid rgba(255,255,255,0.08)",
                      background: "#292929",
                      color: "#ffffff",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 700,
                        marginBottom: "4px",
                      }}
                    >
                      ♞ Move Trainer
                    </div>

                    <div
                      style={{
                        color: "#929292",
                        fontSize: "12px",
                      }}
                    >
                      Practice the moves from this position.
                    </div>
                  </button>

                  <button
                    onClick={openOpeningExplorer}
                    style={{
                      flex: "1 1 220px",
                      padding: "14px 16px",
                      borderRadius: "10px",
                      border:
                        "1px solid rgba(255,255,255,0.08)",
                      background: "#292929",
                      color: "#ffffff",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 700,
                        marginBottom: "4px",
                      }}
                    >
                      ♟ Opening Explorer
                    </div>

                    <div
                      style={{
                        color: "#929292",
                        fontSize: "12px",
                      }}
                    >
                      Explore this position in more detail.
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}