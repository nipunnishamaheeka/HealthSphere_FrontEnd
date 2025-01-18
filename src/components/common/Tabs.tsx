// tabs.d.ts or your component file
import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

const Tabs = TabsPrimitive.Root
const TabsList = TabsPrimitive.List
const TabsTrigger = TabsPrimitive.Trigger
const TabsContent = TabsPrimitive.Content

type TabsProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
type TabsListProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
type TabsTriggerProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
type TabsContentProps = React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>

export {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
    type TabsProps,
    type TabsListProps,
    type TabsTriggerProps,
    type TabsContentProps,
}