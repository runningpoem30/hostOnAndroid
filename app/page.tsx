import Image from "next/image";
import ContactForm from "./ContactForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-[#ededed] font-sans selection:bg-neutral-800 flex flex-col items-center">
      {/* Dynamic diagonal background lines (subtle Onyx-like pattern) */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20" style={{
        backgroundImage: 'repeating-linear-gradient(45deg, #111 25%, transparent 25%, transparent 75%, #111 75%, #111), repeating-linear-gradient(45deg, #111 25%, #000 25%, #000 75%, #111 75%, #111)',
        backgroundPosition: '0 0, 10px 10px',
        backgroundSize: '20px 20px',
      }}></div>

      {/* Navigation */}
      <nav className="w-full max-w-7xl mx-auto flex items-center justify-between py-6 px-6 relative z-10 border-b border-neutral-800/50">
        <div className="flex items-center gap-12">
          <span className="text-xl font-medium tracking-wide">arya</span>
          <div className="hidden md:flex gap-6 text-sm text-neutral-400">
            {/* <a href="#" className="hover:text-white transition-colors">Setup</a>
            <a href="#" className="hover:text-white transition-colors">Blog</a> */}
          </div>
        </div>
        <div className="flex items-center gap-6 text-sm text-neutral-400">
          <div className="hidden md:flex items-center gap-2 bg-neutral-900/50 px-4 py-1.5 rounded-full border border-neutral-800">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <a href="https://goarya.dev">goarya.dev</a>
          </div>
          <a href="https://x.com/PoemRunning" className="hover:text-white transition-colors">𝕏</a>
          <a href="https://github.com/runningpoem30" className="hover:text-white transition-colors">GH</a>
        </div>
      </nav>

      <main className="w-full max-w-5xl mx-auto px-6 pt-24 pb-32 relative z-10 flex flex-col items-start w-full">
        {/* Hero Section */}
        <div className="max-w-2xl mb-16">
          <h1 className="text-5xl md:text-7xl font-semibold tracking-tight leading-[1.1] mb-6">
            Self Hosting.<br />
            <span className="text-neutral-400">Server in my Pocket.</span>
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
            This entire Nextjs application is served directly from an Android phone running Termux. No AWS, no Vercel, just pure localized computing.
          </p>

          {/* Contact / Action Area */}
          <ContactForm />
        </div>

        {/* Terminal/Screenshot Section */}
        <div className="w-full mt-10 relative group">
          <div className="absolute -inset-1 bg-gradient-to-b from-neutral-800 to-transparent rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          
          <div className="relative rounded-xl overflow-hidden border border-neutral-800 bg-[#0a0a0a] shadow-2xl">
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-800/80 bg-[#050505]">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <div className="text-xs font-mono text-neutral-500 font-medium">
                termux -- android-host
              </div>
              <div className="w-12"></div>
            </div>
            
            {/* Image Content Container */}
            <div className="relative w-full aspect-video md:aspect-[21/9] bg-black">
              <Image 
                src="/screenshot.png"
                alt="Termux server running on Android"
                fill
                className="object-cover object-center sm:object-contain opacity-90"
                priority
              />
              
              {/* Overlay Gradient for integration */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 pointer-events-none"></div>
            </div>
            
            {/* Terminal Bottom Text */}
            <div className="absolute bottom-0 left-0 w-full p-6 text-sm font-mono text-neutral-400">
              <p className="mb-2"><span className="text-green-400">&gt;</span> Initializing Termux environment...</p>
              <p className="mb-2"><span className="text-green-400">&gt;</span> Spawning PM2 daemon for static server...</p>
              <p className="mb-2 text-cyan-400">&gt; Port 8080 exposed to public subnet.</p>
              <p className="flex items-center gap-2">
                <span className="text-green-400">&gt;</span> Status: Online and accepting connections.
                <span className="w-2 h-4 bg-white/70 animate-pulse inline-block"></span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
