import { Header } from "@/components/layout/Header";
import {
  Home, Settings, User, Bell, Search, Plus, Minus, X, Check,
  ChevronRight, ChevronDown, ChevronLeft, ChevronUp,
  ArrowRight, ArrowLeft, ExternalLink, Link,
  Edit, Trash2, Copy, Download, Upload,
  Eye, EyeOff, Lock, Unlock,
  Star, Heart, Bookmark,
  Mail, Phone, MessageSquare,
  Calendar, Clock, Globe,
  Palette, Layers, Zap, Package, Grid3x3,
  Sun, Moon, Menu, MoreHorizontal, MoreVertical,
  AlertCircle, AlertTriangle, Info, CheckCircle, XCircle,
} from "lucide-react";

const icons = [
  { name: "Home", icon: <Home size={20} /> },
  { name: "Settings", icon: <Settings size={20} /> },
  { name: "User", icon: <User size={20} /> },
  { name: "Bell", icon: <Bell size={20} /> },
  { name: "Search", icon: <Search size={20} /> },
  { name: "Plus", icon: <Plus size={20} /> },
  { name: "Minus", icon: <Minus size={20} /> },
  { name: "X", icon: <X size={20} /> },
  { name: "Check", icon: <Check size={20} /> },
  { name: "ChevronRight", icon: <ChevronRight size={20} /> },
  { name: "ChevronDown", icon: <ChevronDown size={20} /> },
  { name: "ChevronLeft", icon: <ChevronLeft size={20} /> },
  { name: "ChevronUp", icon: <ChevronUp size={20} /> },
  { name: "ArrowRight", icon: <ArrowRight size={20} /> },
  { name: "ArrowLeft", icon: <ArrowLeft size={20} /> },
  { name: "ExternalLink", icon: <ExternalLink size={20} /> },
  { name: "Link", icon: <Link size={20} /> },
  { name: "Edit", icon: <Edit size={20} /> },
  { name: "Trash2", icon: <Trash2 size={20} /> },
  { name: "Copy", icon: <Copy size={20} /> },
  { name: "Download", icon: <Download size={20} /> },
  { name: "Upload", icon: <Upload size={20} /> },
  { name: "Eye", icon: <Eye size={20} /> },
  { name: "EyeOff", icon: <EyeOff size={20} /> },
  { name: "Lock", icon: <Lock size={20} /> },
  { name: "Unlock", icon: <Unlock size={20} /> },
  { name: "Star", icon: <Star size={20} /> },
  { name: "Heart", icon: <Heart size={20} /> },
  { name: "Bookmark", icon: <Bookmark size={20} /> },
  { name: "Mail", icon: <Mail size={20} /> },
  { name: "Phone", icon: <Phone size={20} /> },
  { name: "MessageSquare", icon: <MessageSquare size={20} /> },
  { name: "Calendar", icon: <Calendar size={20} /> },
  { name: "Clock", icon: <Clock size={20} /> },
  { name: "Globe", icon: <Globe size={20} /> },
  { name: "Palette", icon: <Palette size={20} /> },
  { name: "Layers", icon: <Layers size={20} /> },
  { name: "Zap", icon: <Zap size={20} /> },
  { name: "Package", icon: <Package size={20} /> },
  { name: "Grid3x3", icon: <Grid3x3 size={20} /> },
  { name: "Sun", icon: <Sun size={20} /> },
  { name: "Moon", icon: <Moon size={20} /> },
  { name: "Menu", icon: <Menu size={20} /> },
  { name: "MoreHorizontal", icon: <MoreHorizontal size={20} /> },
  { name: "MoreVertical", icon: <MoreVertical size={20} /> },
  { name: "AlertCircle", icon: <AlertCircle size={20} /> },
  { name: "AlertTriangle", icon: <AlertTriangle size={20} /> },
  { name: "Info", icon: <Info size={20} /> },
  { name: "CheckCircle", icon: <CheckCircle size={20} /> },
  { name: "XCircle", icon: <XCircle size={20} /> },
];

export default function IconsPage() {
  return (
    <>
      <Header title="Icons" subtitle="Biblioteca de ícones Lucide React" />
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-8"
          style={{ background: "var(--rockat-primary-100)", color: "var(--rockat-primary-700)" }}
        >
          <Package size={12} />
          lucide-react
        </div>

        <p className="text-base mb-10" style={{ color: "var(--rockat-text-muted)" }}>
          O Rock-at UI usa{" "}
          <strong style={{ color: "var(--rockat-text)" }}>Lucide React</strong> como biblioteca
          de ícones padrão. Os ícones são consistentes, minimalistas e totalmente customizáveis via props.
        </p>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {icons.map(({ name, icon }) => (
            <div
              key={name}
              className="flex flex-col items-center gap-2 p-3 rounded-xl transition-all hover:shadow-sm"
              style={{ border: "1px solid var(--rockat-border)", background: "var(--rockat-bg-elevated)" }}
            >
              <div style={{ color: "var(--rockat-text)" }}>{icon}</div>
              <span
                className="text-xs text-center leading-tight"
                style={{ color: "var(--rockat-text-muted)" }}
              >
                {name}
              </span>
            </div>
          ))}
        </div>

        <div
          className="mt-10 p-5 rounded-2xl"
          style={{ background: "var(--rockat-primary-50)", border: "1px solid var(--rockat-primary-100)" }}
        >
          <p className="text-sm font-semibold mb-2" style={{ color: "var(--rockat-primary-700)" }}>
            Como usar
          </p>
          <code
            className="text-xs font-mono block"
            style={{ color: "var(--rockat-text)" }}
          >
            {`import { Download } from "lucide-react";`}
            <br />
            {`<Download size={20} />`}
          </code>
        </div>
      </div>
    </>
  );
}
