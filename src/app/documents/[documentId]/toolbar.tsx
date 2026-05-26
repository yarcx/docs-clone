'use client'

import { cn } from '@/lib/utils';
import { Bold, BoldIcon, Italic, ItalicIcon, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SpellCheckIcon, Underline, UnderlineIcon, Undo2Icon } from 'lucide-react';
import React from 'react'
import { useEditorStore } from '@/store/use-editor-store';
import { Separator } from '@/components/ui/separator';  

interface ToolBarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon
}

const ToolBarButton = ({ onClick, isActive, icon: Icon }: ToolBarButtonProps) => {
  return <button onClick={onClick} className={cn('text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80', isActive && "bg-neutral-200/80")}>
    <Icon className='size-4' />
  </button>
};


const Toolbar = () => {
  const { editor } = useEditorStore();
  console.log({ editor }, "editor from toolbar")
  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
      [
        {
          label: "undo",
          icon: Undo2Icon,
          onClick: () => editor?.chain().focus().undo().run(),
          isActive: false,
        },
        {
          label: "Redo",
          icon: Redo2Icon,
          onClick: () => editor?.chain().focus().redo().run(),
          isActive: false,
        },
        {
          label: "print",
          icon: PrinterIcon,
          onClick: () => window.print()
        },
        {
          label: "Spell Check",
          isActive: !!editor?.view.dom.getAttribute('spellcheck'),
          icon: SpellCheckIcon,
          onClick: () => {
            const current = editor?.view.dom.getAttribute('spellcheck')
            editor?.view.dom.setAttribute('spellcheck', current === 'false' ? 'false' : 'true')
          }
        }
      ],
      [
        {
          label: "Bold",
          icon: BoldIcon,
          isActive: editor?.isActive('bold'),
          onClick: () => {
            editor?.chain().focus().setBold().run();
          }
        },
        {
          label: "Italic",
          icon: ItalicIcon,
          isActive: editor?.isActive('italic'),
          onClick: () => {
            editor?.chain().focus().setItalic().run();
          }
        },
        {
          label: "Underline",
          icon: UnderlineIcon,
          isActive: editor?.isActive('underline'),
          onClick: () => {
            editor?.chain().focus().toggleUnderline().run();
          }
        }
      ],
      [
        {
          label: "Comment",
          icon: MessageSquarePlusIcon,
          isActive: false,
          onClick: () => {
            console.log('Todo: comment');
          }
        },
        {
          label: "List Todo",
          icon: ListTodoIcon,
          isActive: editor?.isActive('taskList'),
          onClick: () => {
            editor?.chain().focus().toggleTaskList().run();
          }
        },
        {
          label: "Remove Formatting",
          icon: RemoveFormattingIcon,
          onClick: () => {
            editor?.chain().focus().unsetAllMarks().run();
          }
        }
      ] 
    ];
  return (
    <div className='px-2.5 pt-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 bg-[#f1f4f9] overflow-x-auto'>
      {sections?.[0].map((item) => (
        <ToolBarButton key={item.label} {...item} />
      ))}
      <Separator orientation='vertical' className="h-6 bg-neutral-300" />
    {/* TODO: Font family */}
      <Separator orientation='vertical' className="h-6 bg-neutral-300" />
    {/* TODO: Heading */}
      <Separator orientation='vertical' className="h-6 bg-neutral-300" />
    {/* TODO: Font size */}
      <Separator orientation='vertical' className="h-6 bg-neutral-300" />
      {sections?.[1].map((item) => (
        <ToolBarButton key={item.label} {...item} />
      ))}
      {/* TODO: Text color */}
      {/* TODO: Highlight color */}
      <Separator orientation='vertical' className="h-6 bg-neutral-300" />
     
      {sections?.[2].map((item) => (
        <ToolBarButton key={item.label} {...item} />
      ))}
      {/* TODO: Link */}
      {/* TODO: Image */}
      {/* TODO: Align */}
      {/* TODO: Line height */}
      {/* TODO: List */}
      {}
    </div>
  )
}

export default Toolbar