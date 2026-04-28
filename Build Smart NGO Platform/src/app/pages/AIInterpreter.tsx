import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Bot, Send, Zap, ChevronRight, CheckCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { GlassCard } from '../components/GlassCard';
import { Badge } from '../components/Badge';
import { toast } from 'sonner';

export function AIInterpreter() {
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleProcess = () => {
    if (!input) return;
    setIsProcessing(true);
    setResult(null);

    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false);
      setResult({
        type: "Resource Request",
        category: "Food Distribution",
        volunteersNeeded: 10,
        urgency: "High",
        tags: ["Food", "Manual Labor", "Local"],
        action: "Create Task & Auto-Match"
      });
      toast.success("AI Interpretation Complete", { description: "Request structured successfully." });
    }, 1500);
  };

  const handleAction = () => {
    toast.success("Task Created!", { description: "Matching algorithm has been triggered." });
    setResult(null);
    setInput("");
  };

  return (
    <div className="max-w-3xl mx-auto py-12 space-y-8">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold flex items-center justify-center gap-3">
          <Sparkles className="text-accent w-8 h-8" />
          AI Request Interpreter
        </h1>
        <p className="text-white/60 text-lg">
          Type a natural language request, and our AI will automatically structure it, categorize the urgency, and dispatch to matching volunteers.
        </p>
      </div>

      <GlassCard className="p-2 border-white/20">
        <div className="relative">
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='e.g., "We need 10 volunteers for a food drive in South Mumbai tomorrow morning..."'
            className="w-full bg-transparent border-0 p-6 pr-16 text-lg text-white placeholder-white/30 focus:ring-0 resize-none min-h-[120px]"
          />
          <Button 
            variant="primary" 
            className="absolute bottom-4 right-4 w-12 h-12 rounded-xl p-0 flex items-center justify-center"
            onClick={handleProcess}
            disabled={isProcessing || !input}
          >
            {isProcessing ? <Bot className="w-5 h-5 animate-pulse" /> : <Send className="w-5 h-5 ml-1" />}
          </Button>
        </div>
      </GlassCard>

      {isProcessing && (
        <div className="flex items-center justify-center gap-3 text-white/60 py-8">
          <Bot className="w-5 h-5 animate-spin" />
          <span>Interpreting request parameters...</span>
        </div>
      )}

      {result && !isProcessing && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <GlassCard className="p-8 border-accent/30 bg-accent/5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-accent flex items-center gap-2">
                <CheckCircle className="w-6 h-6" /> Structured Output
              </h3>
              <Badge variant="outline" className="border-accent text-accent">Confidence: 98%</Badge>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <div className="text-sm text-white/50 mb-1">Detected Intent</div>
                <div className="font-semibold">{result.type}</div>
              </div>
              <div>
                <div className="text-sm text-white/50 mb-1">Category</div>
                <div className="font-semibold">{result.category}</div>
              </div>
              <div>
                <div className="text-sm text-white/50 mb-1">Volunteers Needed</div>
                <div className="font-semibold text-primary text-xl">{result.volunteersNeeded}</div>
              </div>
              <div>
                <div className="text-sm text-white/50 mb-1">Urgency</div>
                <Badge variant="high">{result.urgency}</Badge>
              </div>
            </div>

            <div className="flex gap-2 mb-8">
              {result.tags.map((t: string) => (
                <span key={t} className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80">{t}</span>
              ))}
            </div>

            <Button variant="outline" className="w-full gap-2 border-accent text-accent hover:bg-accent/10" onClick={handleAction}>
              <Zap className="w-4 h-4" />
              {result.action}
              <ChevronRight className="w-4 h-4" />
            </Button>
          </GlassCard>
        </motion.div>
      )}
    </div>
  );
}
