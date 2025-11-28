import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-slate-800 border-b border-slate-700">
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/dashboard">
          <h1 className="text-2xl font-bold text-purple-400">운칠 UNCHIL</h1>
        </Link>
        <nav className="flex gap-4">
          <Link href="/dashboard" className="text-slate-300 hover:text-white">
            대시보드
          </Link>
          <Link href="/settings" className="text-slate-300 hover:text-white">
            설정
          </Link>
        </nav>
      </div>
    </header>
  );
}
```

**⑥ "Commit changes"**

---

### **2. components/HistoryChart.tsx 만들기**

**① components 폴더에서 "Add file" → "Create new file"**

**② 파일 이름:**
```
HistoryChart.tsx
