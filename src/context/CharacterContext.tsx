import { createContext, useState, useContext, ReactNode } from 'react';
import { Character } from '../config/characters';

type Status = 'waiting' | 'detecting' | 'connecting' | 'active';

interface CharacterContextType {
  status: Status;
  setStatus: (status: Status) => void;
  character: Character | null;
  setCharacter: (character: Character | null) => void;
  message: string;
  setMessage: (message: string) => void;
  audioLevel: number;
  setAudioLevel: (level: number) => void;
  handleReset: () => void;
}

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export const CharacterProvider = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<Status>('waiting');
  const [character, setCharacter] = useState<Character | null>(null);
  const [message, setMessage] = useState<string>('Choose a character to start chatting!');
  const [audioLevel, setAudioLevel] = useState<number>(0);

  const handleReset = () => {
    setStatus('waiting');
    setCharacter(null);
    setMessage('Choose a character to start chatting!');
    setAudioLevel(0);
  };

  return (
    <CharacterContext.Provider
      value={{
        status,
        setStatus,
        character,
        setCharacter,
        message,
        setMessage,
        audioLevel,
        setAudioLevel,
        handleReset
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacter = (): CharacterContextType => {
  const context = useContext(CharacterContext);
  if (context === undefined) {
    throw new Error('useCharacter must be used within a CharacterProvider');
  }
  return context;
};
