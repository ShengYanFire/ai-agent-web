import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function ModelSelect({ model, setModel }: { model: string, setModel: (model: string) => void }) {
    return (
        <Select value={model} onValueChange={setModel}>
            <SelectTrigger className="border-0 shadow-none hover:shadow-2xs hover:bg-blue-50">
                <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value='qwen3:8b'>qwen3:8b</SelectItem>
                <SelectItem value='deepseek-coder'>deepseek-coder</SelectItem>
            </SelectContent>
        </Select>
    )
}
