import { create } from "zustand";
import { type Editor } from '@tiptap/react'

interface EditorStoreProps { 
    editor: Editor | null;
    setEditor: (editor: Editor | null) => void;
}

export const useEditorStore = create<EditorStoreProps>((set) => ({
    editor: null,
    setEditor: (editor: Editor | null) => set({ editor }),
}));