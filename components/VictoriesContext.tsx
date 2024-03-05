// VictoriesContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface Victory {
  victoryText: string;
  // Add other properties as needed
}

interface VictoriesContextType {
  previewVictories: Victory[] | null;
  setPreviewVictories: Dispatch<SetStateAction<Victory[]>>;
}

const VictoriesContext = createContext<VictoriesContextType | undefined>(
  undefined
);

export const useVictories = () => {
  const context = useContext(VictoriesContext);
  if (context === undefined) {
    throw new Error("useVictories must be used within a VictoriesProvider");
  }
  return context;
};

interface VictoriesProviderProps {
  children: ReactNode;
}

export const VictoriesProvider = ({ children }: VictoriesProviderProps) => {
  const [previewVictories, setPreviewVictories] = useState<Victory[]>([]);

  return (
    <VictoriesContext.Provider
      value={{ previewVictories, setPreviewVictories }}
    >
      {children}
    </VictoriesContext.Provider>
  );
};
