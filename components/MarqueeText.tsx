export default function MarqueeText() {
  return (
    <div className="text-white py-2 overflow-hidden whitespace-nowrap">
      <div className="inline-block animate-marquee">
        Book your ride now! Call us at +91 9730545491 
      </div>
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 12s linear infinite;
        }
      `}</style>
    </div>
  )
}
