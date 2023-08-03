import { useState } from "react";
import { Rect, Stage, Layer, Text } from "react-konva";

interface Block {
  x: number;
  y: number;
  id: string;
  name: string;
  color: string;
}

interface Tooltip {
  visible: boolean;
  text: string;
  x: number;
  y: number;
}

function App() {
  const [tooltip, setTooltip] = useState<Tooltip>({
    visible: false,
    text: "",
    x: 0,
    y: 0,
  });

  const [blocks, setBlocks] = useState<Block[]>([
    { x: 20, y: 20, id: "block1", name: "Block 1", color: "red" },
  ]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleMouseEnter = (e: any, name: string) => {
    // show tooltip
    setTooltip({
      visible: true,
      text: name,
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const handleMouseLeave = () => {
    // hide tooltip
    setTooltip({ visible: false, text: "", x: 0, y: 0 });
  };

  const addBlock = () => {
    const newBlock: Block = {
      x: 20,
      y: 20,
      id: `block${blocks.length + 1}`,
      name: `Block ${blocks.length + 1}`,
      color: "red",
    };
    setBlocks([...blocks, newBlock]);
  };

  const handleBlockClick = (id: string) => {
    const name = window.prompt("Enter block name");
    const color = window.prompt("Enter block color");
    if (name !== null && color !== null) {
      setBlocks(
        blocks.map((block) =>
          block.id === id ? { ...block, name, color } : block
        )
      );
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 32,
      }}
    >
      <span>Train Canvas</span>
      <button onClick={addBlock}>Add Block</button>
      <section
        id="drawer-area"
        style={{ width: 800, height: 800, border: "1px solid red" }}
      >
        <Stage width={800} height={800}>
          <Layer>
            {blocks.map((block, i) => (
              <Rect
                key={i}
                x={block.x}
                y={block.y}
                width={100}
                height={100}
                fill={block.color}
                draggable
                onDragEnd={() => handleMouseLeave}
                onClick={() => handleBlockClick(block.id)}
                onMouseEnter={(e) => handleMouseEnter(e, block.name)}
                onMouseLeave={handleMouseLeave}
              />
            ))}
            {tooltip.visible && (
              <Text
                text={tooltip.text}
                x={tooltip.x}
                y={tooltip.y - 10} // adjust the position as needed
                fill="black"
              />
            )}
          </Layer>
        </Stage>
      </section>
    </div>
  );
}

export default App;
