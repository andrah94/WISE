// 21st.dev: scrollxui FAQ accordion primitives (shadcn/radix)
import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Accordion = AccordionPrimitive.Root

export const AccordionItem = React.forwardRef<React.ElementRef<typeof AccordionPrimitive.Item>, React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>>(
  ({ className, ...props }, ref) => <AccordionPrimitive.Item ref={ref} className={cn('border-b border-white/10', className)} {...props} />)
AccordionItem.displayName = 'AccordionItem'

export const AccordionTrigger = React.forwardRef<React.ElementRef<typeof AccordionPrimitive.Trigger>, React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>>(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger ref={ref}
        className={cn('group flex flex-1 items-center justify-between gap-6 py-7 text-left font-serif text-xl text-bone transition-colors hover:text-gold-2 md:text-[1.6rem]', className)} {...props}>
        {children}
        <span className="grid size-10 shrink-0 place-items-center rounded-full border border-white/15 transition-all duration-300 group-data-[state=open]:rotate-45 group-data-[state=open]:border-gold group-data-[state=open]:bg-gold group-data-[state=open]:text-ink">
          <Plus className="size-4" />
        </span>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  ))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

export const AccordionContent = React.forwardRef<React.ElementRef<typeof AccordionPrimitive.Content>, React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>>(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content ref={ref} className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down" {...props}>
      <div className={cn('max-w-2xl pb-7 text-base font-light leading-relaxed text-bone/65 md:text-lg', className)}>{children}</div>
    </AccordionPrimitive.Content>
  ))
AccordionContent.displayName = AccordionPrimitive.Content.displayName
