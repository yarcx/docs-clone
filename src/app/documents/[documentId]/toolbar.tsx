'use client'

import { SketchPicker, type ColorResult } from 'react-color'
import { cn } from '@/lib/utils';
import { AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon, BoldIcon, ChevronDownIcon, HighlighterIcon, ImageIcon, Italic, ItalicIcon, Link2Icon, ListIcon, ListOrderedIcon, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, MinusIcon, PlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SearchIcon, SpellCheckIcon, UnderlineIcon, Undo2Icon, UploadIcon } from 'lucide-react';
import React, { useState } from 'react'
import { useEditorStore } from '@/store/use-editor-store';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Level } from '@tiptap/extension-heading';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';


const AlignButton = () => {
  const { editor } = useEditorStore()

  const alignments = [
    {
      label: "Align Left",
      value: "left",
      icon: AlignLeftIcon,
    },
    {
      label: "Align Center",
      value: "center",
      icon: AlignCenterIcon,
    },
    {
      label: "Align Right",
      value: "right",
      icon: AlignRightIcon,
    },
    {
      label: "Align Justify",
      value: "justify",
      icon: AlignJustifyIcon,
    },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn('h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden flex-col text-sm')}>
          <AlignLeftIcon className="size-4" /></button></DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white p-0">
        {alignments.map(({ label, value, icon: Icon }) => {
          return (
            <button key={value} onClick={() => editor?.chain().focus().setTextAlign(value).run()}
              className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm gover:bg-neutral-200/80", editor?.isActive({ textAlign: value }) && "bg-neutral-200/80")}>
              <Icon className="size-4" />
              <span className="text-sm">{label}</span>
            </button>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const FontSizeButton = () => {
  const { editor } = useEditorStore()

  const currentFontSize = editor?.getAttributes("textStyle").fontSize ? editor?.getAttributes("textStyle").fontSize.replace('px', "") : "16"

  const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputValue, setInputValue] = useState(fontSize);
  const [isEditing, setIsEditing] = useState(false);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);
    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run()
      setFontSize(newSize);
      setInputValue(newSize);
      setIsEditing(false)

    }
  }

  const handleInputChage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleInputBlur = () => {
    updateFontSize(inputValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      updateFontSize(inputValue);
      editor?.commands?.focus()
    }
  }

  const increment = () => {
    const newSize = parseInt(fontSize) + 1;
    updateFontSize(newSize.toString())
  }

  const decrement = () => {
    const newSize = parseInt(fontSize) - 1;
    if (newSize > 1) { updateFontSize(newSize.toString()) }
  }


  return (
    <div className='flex items-center gap-x-0.5'>
      <button className='h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80' onClick={decrement}>
        <MinusIcon className="size-4" />
      </button>
      {isEditing ? (
        <input className='h-7 w-10 text-sm border text-center border-neutral-400 rounded-sm cursor-text bg-transparent focus:outline-none focus:ring-0' type="text"
          onChange={handleInputChage}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          value={inputValue}
        />
      ) : (<button onClick={() => {
        setIsEditing(true)
        setFontSize(currentFontSize)
      }} className={cn('h-7 w-10 text-sm border text-center border-neutral-400 rounded-sm text-black bg-transparent')}>{currentFontSize}</button>)}
      <button className='h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80' onClick={increment}>
        <PlusIcon className="size-4" />
      </button>
    </div>
  )
}

const ListButton = () => {
  const { editor } = useEditorStore()

  const lists = [
    {
      label: "Bullet List",
      icon: ListIcon,
      isActive: () => editor?.isActive("bulletList"),
      onClick: () => editor?.chain().focus().toggleBulletList?.()?.run()
    },
    {
      label: "Orderd List",
      icon: ListOrderedIcon,
      isActive: () => editor?.isActive("orderedList"),
      onClick: () => editor?.chain().focus().toggleOrderedList?.()?.run()
    },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn('h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden flex-col text-sm')}>
          <ListIcon className="size-4" /></button></DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white p-0">
        {lists.map(({ label, icon: Icon, onClick, isActive }) => {
          return (
            <button key={label} onClick={onClick}
              className={cn("flex items-cen ter gap-x-2 px-2 py-1 rounded-sm gover:bg-neutral-200/80", isActive() && "bg-neutral-200/80")}>
              <Icon className="size-4" />
              <span className="text-sm">{label}</span>
            </button>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}


const ImageButton = () => {
  const { editor } = useEditorStore()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [imageUrl, setimageUrl] = useState('')

  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run()
  }

  const onUpload = () => {
    const input = document.createElement('input')
    input.type = "file";
    input.accept = 'image/*';

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file)
        onChange(imageUrl)
      }
    }
    input.click()
  }

  const handleImageUrlSubmit = () => {
    if (imageUrl) {
      onChange(imageUrl);
      setimageUrl("");
      setIsDialogOpen(false)
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className={cn('h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden flex-col text-sm')}><ImageIcon className="size-4" /></button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white border-0">
          <DropdownMenuItem onClick={onUpload}>
            <UploadIcon className="size-4 mr-2" />
            Upload
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
            <SearchIcon className="size-4 mr-2" />
            Paste image url
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(false)}>
        <DialogContent className="bg-white border-0 z-[100]">
          <DialogHeader>
            <DialogTitle>Insert image url</DialogTitle>
          </DialogHeader>
          <Input placeholder='Insert image URL' value={imageUrl}
            onChange={(e) => {
              setimageUrl(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleImageUrlSubmit()
              }
            }}
          />
          <DialogFooter>
            <Button onClick={handleImageUrlSubmit}>
              Insert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}



const LinkButton = () => {
  const { editor } = useEditorStore()
  const [value, setValue] = useState('')

  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange('link').setLink({ href }).run()
    setValue('')
  }

  return (
    <DropdownMenu onOpenChange={(open) => open && setValue(editor?.getAttributes('link').href || '')}>
      <DropdownMenuTrigger asChild>
        <button className={cn('h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden flex-col text-sm')}>
          <Link2Icon className="size-4" /></button></DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5 flex items-center bg-white gap-x-2">
        <Input placeholder='https://example.com' value={value} onChange={(e) => setValue(e.target.value)} />
        <Button onClick={() => onChange(value)}>Apply</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const HighlightColorButton = () => {
  const { editor } = useEditorStore()
  const value = editor?.getAttributes('highlight').color || '#ffffff';
  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn('h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden flex-col text-sm')}>
          <HighlighterIcon className="size-4" /></button></DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white p-0">
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const TextColorButton = () => {
  const { editor } = useEditorStore()
  const value = editor?.getAttributes('textStyle').color || '#000000';

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn('h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden flex-col text-sm')}>
          <span>A</span>
          <div className="h-0.5 w-full" style={{ backgroundColor: value }}></div></button></DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white p-0">
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const HeadingLevelButton = () => {
  const { editor } = useEditorStore()

  const headings = [
    { label: 'Normal text', value: 0, fontSize: '16px' },
    { label: 'Heading 1', value: 1, fontSize: '32px' },
    { label: 'Heading 2', value: 2, fontSize: '24px' },
    { label: 'Heading 3', value: 3, fontSize: '20px' },
    { label: 'Heading 4', value: 4, fontSize: '18px' },
    { label: 'Heading 5', value: 5, fontSize: '16px' },
  ];

  const getCurrentHeading
    = () => {
      for (let level = 1; level <= 5; level++) {
        if (editor?.isActive('heading', { level })) {
          return `Heading ${level}`
        }
      }
      return 'Normal text'
    };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn('h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm')}>
          <span className="truncate">
            {getCurrentHeading()}
          </span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" /></button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='p-1 bg-white flex flex-col gap-y-1 border-0'>
        {headings.map(({ label, value, fontSize }) => (
          <button
            key={value}
            style={{ fontSize: fontSize }}
            className={cn("flex items-center w-full gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80", (value === 0 && !editor?.isActive("heading")) || editor?.isActive('heading', { level: value }) && 'bg-neutral-200/80')}
            onClick={() => {
              if (value === 0) {
                editor?.chain().focus().setParagraph().run()
              } else {
                editor?.chain().focus().toggleHeading({ level: value as Level }).run()
              }
            }}
          >
            {label}
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const FontFamilyButton = () => {
  const { editor } = useEditorStore()

  const fonts = [{ label: "Arial", value: "Arial" },
  { label: 'Times New Roman', value: 'Times New Roman' },
  { label: 'Monospace', value: 'Monospace' },
  { label: 'Courier New', value: 'Courier New' },
  { label: 'Verdana', value: 'Verdana' },
  { label: 'Georgia', value: 'Georgia' },
  { label: 'Arial Black', value: 'Arial Black' },
  { label: 'Impact', value: 'Impact' },
  { label: 'Comic Sans MS', value: 'Comic Sans MS' },
  { label: 'Trebuchet MS', value: 'Trebuchet MS' },
  { label: 'Verdana', value: 'Verdana' },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn('h-7 w-[120px] shrink-0 flex items-center justify-between rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm')}>
          <span className="truncate">
            {editor?.getAttributes('textStyle').fontFamily || 'Arial'}
          </span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" /></button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gapy-1">
        {fonts.map(({ label, value }) => (
          <button key={value} className={cn("flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80", editor?.getAttributes('textStyle').fontFamily === value && 'bg-neutral-200/80')}
            onClick={() => editor?.chain().focus().setFontFamily(value).run()}
            style={{ fontFamily: value }}>
            <span className='text-sm'>{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

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
      <FontFamilyButton />
      <Separator orientation='vertical' className="h-6 bg-neutral-300" />
      <HeadingLevelButton />
      <Separator orientation='vertical' className="h-6 bg-neutral-300" />
      <FontSizeButton />
      <Separator orientation='vertical' className="h-6 bg-neutral-300" />
      {sections?.[1].map((item) => (
        <ToolBarButton key={item.label} {...item} />
      ))}
      <TextColorButton />
      <HighlightColorButton />
      <Separator orientation='vertical' className="h-6 bg-neutral-300" />

      {sections?.[2].map((item) => (
        <ToolBarButton key={item.label} {...item} />
      ))}
      <LinkButton />
      <ImageButton />
      <AlignButton />
      {/* TODO: Line height */}
      <ListButton />

    </div>
  )
}

export default Toolbar