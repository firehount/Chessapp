export type StockfishMessageHandler = (message: string) => void;

export function createStockfishEngine(
  onMessage: StockfishMessageHandler,
) {
  const worker = new Worker(
   "/stockfish.js#/stockfish.wasm",
  );

  worker.onmessage = (event) => {
    onMessage(String(event.data));
  };

  worker.onerror = (event) => {
    console.error("Stockfish Worker error:", event);
  };

  return {
    send(command: string) {
      worker.postMessage(command);
    },

    stop() {
      worker.terminate();
    },
  };
}