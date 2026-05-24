'use client'

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
const Editor = () => {
  const editor = useEditor({
    extensions: [StarterKit], // define your extension array
      content: "<p>Hello World!</p>", // initial content
      editorProps: {
          attributes: {
              style: "padding-left: 56px; padding-right: 56px;",
              class: 'focus:outline-none print:border-0 border bg-white border-[#c7c7c7] flex flex-col min-h-[1054px] w-[816px] pr-14 cursor-text'
          }
    }
  });

    return (
        <div className='size-full overflow-x-auto bg-[#f9ffd] px-4 print:p-0 print:bg-white print:overflow-visible'>
            <div className="min-2-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
            <EditorContent editor={editor} />
            </div>
            

      </div>
    );
};

export default Editor;
