const { useState, useEffect, useRef } = React;

// Multilingual Content Dictionary for VQC Tirumala Devotees
const TRANSLATIONS = {
  EN: {
    systemTitle: "TIRUMALA TIRUPATI DEVASTHANAMS • VAIKUNTAM QUEUE COMPLEX",
    compartmentTag: "VQC-2 | COMPARTMENT #16",
    serviceIdentifier: "SARVA DARSHAN BATCH",
    batchDetails: "Capacity: 320 Devotees | Tokens: SD-401 to SD-720",
    expectedDarshanLabel: "EXPECTED TIME TO DARSHAN",
    reentryCutoffLabel: "RE-ENTRY CUTOFF",
    reentryNote: "(10 mins prior to release)",
    reentryStatusActive: "RE-ENTRY PASSES ACTIVE",
    reentryStatusClosed: "GATE ENTRY CLOSED - STAND BY",
    assemblyWarning: "⚠️ ASSEMBLY WARNING: COMPARTMENT DOOR OPENING IMMINENT. PLEASE STAND FOR SRIVARI DARSHANAM.",
    doorUnlatchHeader: "AUTOMATED DOOR UNLATCH SYSTEM ACTIVE",
    doorUnlatchTitle: "🔔 COMPARTMENT DOOR UNLATCHING NOW — PROCEED FOR SRIVARI DARSHANAM",
    doorUnlatchSub: "Queue gates opening. Proceed in single line towards Vendi Vakili & Ananda Nilayam.",
    ticker: [
      "🥛 Free Milk, Buttermilk & Hot Laddu Prasadam available at Counter B (Inside VQC-2 Hall)",
      "🎫 Physical Re-entry Passes active at Exit Gate for Washroom/Locker access",
      "🙏 Keep paper tokens safe for scan-validation at Vendi Vakili & Jaya-Vijaya Gate",
      "🚨 Emergency Medical Assistance: Dial Extension 108 or report to Security Desk 3"
    ],
    stateTitles: {
      GREEN: "SRIVARI DARSHANAM STATUS: QUEUE MOVING NORMAL",
      YELLOW: "SRIVARI DARSHANAM STATUS: PROTOCOL HOLD",
      RED: "SRIVARI DARSHANAM STATUS: QUEUE STOPPED (Tiruppavada Seva)"
    },
    stateSubtext: {
      GREEN: "Current Throughput: ~2,800 Devotees/Hr | Sanctum Clear for Srivari Darshanam",
      YELLOW: "VIP Break Clearance & Alankaram in Progress (+15 mins hold applied)",
      RED: "Est. Ritual Finish: 06:15 AM (Timer Automatically Adjusted by System)"
    }
  },
  TE: {
    systemTitle: "తిరుమల తిరుపతి దేవస్థానములు • వైకుంఠం క్యూ కాంప్లెక్స్",
    compartmentTag: "VQC-2 | కంపార్ట్‌మెంట్ #16",
    serviceIdentifier: "సర్వ దర్శనం బ్యాచ్",
    batchDetails: "సామర్థ్యం: 320 భక్తులు | టోకెన్లు: SD-401 నుండి SD-720",
    expectedDarshanLabel: "శ్రీవారి దర్శన అంచనా సమయం",
    reentryCutoffLabel: "పునఃప్రవేశ ముగింపు సమయం",
    reentryNote: "(తెరిచే ముందు 10 నిమిషాలు)",
    reentryStatusActive: "రీ-ఎంట్రీ పాస్‌లు అందుబాటులో ఉన్నాయి",
    reentryStatusClosed: "ద్వారం వద్ద ప్రవేశం ముగిసింది",
    assemblyWarning: "⚠️ హెచ్చరిక: కంపార్ట్‌మెంట్ ద్వారం త్వరలో తెరవబడుతుంది. శ్రీవారి దర్శనానికి సిద్ధంగా ఉండండి.",
    doorUnlatchHeader: "స్వయంచాలక ద్వార విముక్తి సంకేతం",
    doorUnlatchTitle: "🔔 ద్వారం తెరుచుకుంటోంది — శ్రీవారి దర్శనం కొరకు ముందుకు కదలండి",
    doorUnlatchSub: "వెండి వాకిలి మరియు ఆనంద నిలయం వైపు క్యూ మార్గం తెరుచుకుంది. ఒకే వరుసలో వెళ్ళండి.",
    ticker: [
      "🥛 ఉచిత పాలు, మజ్జిగ మరియు వేడి ప్రసాదం కౌంటర్ B వద్ద లభిస్తాయి (VQC-2 లోపల)",
      "🎫 మరుగుదొడ్లు / లాకర్ల కొరకు నిష్క్రమణ ద్వారం వద్ద రీ-ఎంట్రీ పాస్‌లు లభిస్తాయి",
      "🙏 వెండి వాకిలి స్కాన్ నిర్ధారణ కొరకు మీ కాగితపు టోకెన్లను సురక్షితంగా ఉంచుకోండి",
      "🚨 అత్యవసర వైద్య సహాయం కొరకు: ఎక్స్‌టెన్షన్ 108 లేదా సెక్యూరిటీ డెస్క్ 3 ని సంప్రదించండి"
    ],
    stateTitles: {
      GREEN: "శ్రీవారి దర్శనం స్థితి: క్యూ సాధారణంగా కదులుతోంది",
      YELLOW: "శ్రీవారి దర్శనం స్థితి: ప్రొటోకాల్ నిలిపివేత",
      RED: "శ్రీవారి దర్శనం స్థితి: క్యూ నిలిపివేయబడింది (తిరుప్పావడ సేవ)"
    },
    stateSubtext: {
      GREEN: "ప్రస్తుత వేగం: గంటకు ~2,800 మంది భక్తులు",
      YELLOW: "విఐపి ప్రొటోకాల్ మార్గం క్లియరెన్స్ పురోగతిలో ఉంది (+15 నిమిషాలు)",
      RED: "అంచనా సేవ పూర్తి సమయం: ఉదయం 06:15 (సమయం సవరించబడింది)"
    }
  },
  HI: {
    systemTitle: "तिरुपति तिरुमला देवस्थानम • वैकुंठम कतार परिसर",
    compartmentTag: "VQC-2 | कम्पार्टमेंट #16",
    serviceIdentifier: "सर्व दर्शन बैच",
    batchDetails: "क्षमता: 320 श्रद्धालु | टोकन: SD-401 से SD-720",
    expectedDarshanLabel: "श्रीवारी दर्शन का अनुमानित समय",
    reentryCutoffLabel: "पुनः प्रवेश समय सीमा",
    reentryNote: "(द्वार खुलने से 10 मिनट पहले)",
    reentryStatusActive: "री-एंट्री पास सक्रिय हैं",
    reentryStatusClosed: "प्रवेश द्वार बंद - तैयार रहें",
    assemblyWarning: "⚠️ चेतावनी: द्वार जल्द खुलने वाला है। श्रीवारी दर्शन हेतु तैयार रहें।",
    doorUnlatchHeader: "स्वचालित द्वार विमुक्ति अलार्म सक्रिय",
    doorUnlatchTitle: "🔔 द्वार खुल रहा है — श्रीवारी दर्शन हेतु आगे बढ़ें",
    doorUnlatchSub: "चांदी के दरवाजे (वेंडी वाकिली) एवं आनंद निलयम हेतु कतार खुल गई है।",
    ticker: [
      "🥛 निःशुल्क दूध, छाछ और गर्म प्रसादम काउंटर B पर उपलब्ध है (VQC-2 परिसर)",
      "🎫 शौचालय एवं लॉकर हेतु निकास द्वार पर री-एंट्री पास उपलब्ध हैं",
      "🙏 कृपया चांदी के दरवाजे (वेंडी वाकिली) पर स्कैन हेतु टोकन सुरक्षित रखें",
      "🚨 आपातकालीन चिकित्सा सहायता: एक्सटेंशन 108 या सुरक्षा डेस्क 3 पर संपर्क करें"
    ],
    stateTitles: {
      GREEN: "श्रीवारी दर्शनम स्थिति: कतार सामान्य रूप से चल रही है",
      YELLOW: "श्रीवारी दर्शनम स्थिति: प्रोटोकॉल होल्ड",
      RED: "श्रीवारी दर्शनम स्थिति: कतार रुकी हुई है (तिरुप्पावडा सेवा)"
    },
    stateSubtext: {
      GREEN: "वर्तमान दर: ~2,800 श्रद्धालु प्रति घंटा",
      YELLOW: "वीआईपी प्रोटोकॉल क्लीयरेंस जारी है (+15 मिनट)",
      RED: "अनुमानित सेवा समाप्ति: 06:15 AM (समय स्वचालित समायोजित)"
    }
  }
};

function VQCDisplayBoard() {
  // Application State
  const [lang, setLang] = useState('EN');
  const [darshanState, setDarshanState] = useState('GREEN'); // 'GREEN' | 'YELLOW' | 'RED'
  const [totalSeconds, setTotalSeconds] = useState(1455); // 00:24:15 default
  const [isPaused, setIsPaused] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [ledMatrixEffect, setLedMatrixEffect] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showDebug, setShowDebug] = useState(true);
  const [hasTriggeredAlarm, setHasTriggeredAlarm] = useState(false);

  const t = TRANSLATIONS[lang] || TRANSLATIONS.EN;

  // Live System Time Clock (IST Updates)
  useEffect(() => {
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  // Main Countdown Timer Logic
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setTotalSeconds((prev) => {
        if (prev <= 1) {
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused]);

  // Audio Alarm Trigger when timer hits 0
  useEffect(() => {
    if (totalSeconds === 0 && !hasTriggeredAlarm) {
      setHasTriggeredAlarm(true);
      if (soundEnabled && window.vqcAudio) {
        window.vqcAudio.playDoorAlarm();
      }
    } else if (totalSeconds > 0 && hasTriggeredAlarm) {
      setHasTriggeredAlarm(false);
    }
  }, [totalSeconds, hasTriggeredAlarm, soundEnabled]);

  // Format Helper for HH:MM:SS
  const formatTime = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    return {
      hours: String(h).padStart(2, '0'),
      minutes: String(m).padStart(2, '0'),
      seconds: String(s).padStart(2, '0')
    };
  };

  const { hours, minutes, seconds } = formatTime(totalSeconds);

  // Compute Expected Time to Darshan based on remaining timer + sanctum movement offset
  const getExpectedDarshanTime = () => {
    // Add estimated 25 minutes sanctum walking time from compartment gate to Ananda Nilayam
    const darshanDate = new Date(currentTime.getTime() + (totalSeconds + 1500) * 1000);
    return darshanDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  // Compute Re-entry Cutoff Time (10 minutes prior to door release)
  const getReentryCutoffTime = () => {
    const cutoffSecs = Math.max(0, totalSeconds - 600);
    const cutoffDate = new Date(currentTime.getTime() + cutoffSecs * 1000);
    return cutoffDate.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const isReentryActive = totalSeconds > 600;
  const isAssemblyWarning = totalSeconds <= 120 && totalSeconds > 0;
  const isDoorUnlatched = totalSeconds === 0;

  // Srivari Darshanam Theme Configuration
  const getDarshanThemeConfig = () => {
    switch (darshanState) {
      case 'GREEN':
        return {
          bg: 'bg-emerald-950/60 border-emerald-500/60 text-emerald-100',
          dot: 'bg-emerald-500 shadow-[0_0_15px_#10B981]',
          glow: 'led-glow-green',
          boxGlow: 'box-glow-green',
          title: t.stateTitles.GREEN,
          sub: t.stateSubtext.GREEN,
          badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
        };
      case 'YELLOW':
        return {
          bg: 'bg-amber-950/60 border-amber-500/60 text-amber-100',
          dot: 'bg-amber-500 shadow-[0_0_15px_#F59E0B]',
          glow: 'led-glow-yellow',
          boxGlow: 'box-glow-yellow',
          title: t.stateTitles.YELLOW,
          sub: t.stateSubtext.YELLOW,
          badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-400/30'
        };
      case 'RED':
      default:
        return {
          bg: 'bg-rose-950/60 border-rose-500/60 text-rose-100',
          dot: 'bg-rose-500 shadow-[0_0_15px_#EF4444]',
          glow: 'led-glow-red',
          boxGlow: 'box-glow-red',
          title: t.stateTitles.RED,
          sub: t.stateSubtext.RED,
          badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-400/30'
        };
    }
  };

  const shrineConfig = getDarshanThemeConfig();

  return (
    <div className={`relative min-h-screen flex flex-col justify-between p-4 md:p-6 lg:p-8 bg-[#0B1120] ${ledMatrixEffect ? 'led-matrix-overlay' : ''} ${isDoorUnlatched ? 'animate-flash-red' : ''}`}>

      {/* ========================================================================= */}
      {/* 1. HEADER SECTION (WITH LORD VENKATESWARA SWAMY DIVINE ICON) */}
      {/* ========================================================================= */}
      <header className="grid grid-cols-1 md:grid-cols-12 items-center gap-4 p-4 lg:p-5 bg-[#111A2E]/90 border-2 border-amber-500/50 rounded-2xl shadow-2xl backdrop-blur-md">
        
        {/* Left: Lord Venkateswara Swamy Divine Avatar Frame */}
        <div className="md:col-span-4 flex items-center space-x-3">
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border-2 border-amber-400 p-0.5 shadow-[0_0_20px_rgba(245,158,11,0.6)] bg-gradient-to-b from-amber-500 to-yellow-600 overflow-hidden">
              <img
                src="./venkateswara_swamy.jpg"
                alt="Lord Venkateswara Swamy"
                className="w-full h-full object-cover rounded-xl"
                onError={(e) => {
                  // Fallback icon if image fails loading
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500"></span>
            </span>
          </div>

          <div>
            <div className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black text-lg md:text-xl lg:text-2xl px-3 py-1 rounded-lg shadow-lg tracking-wider font-mono">
              {t.compartmentTag}
            </div>
            <div className="text-xs text-amber-300 font-bold mt-1 tracking-wide uppercase flex items-center space-x-1">
              <span>🙏 OM NAMO VENKATESAYA</span>
            </div>
          </div>
        </div>

        {/* Center: System Title & Live HH:MM:SS AM/PM Clock */}
        <div className="md:col-span-4 text-center">
          <div className="text-xs md:text-sm font-bold text-amber-400 tracking-widest uppercase mb-0.5">
            {t.systemTitle}
          </div>
          <div className="text-3xl md:text-4xl lg:text-5xl font-extrabold font-mono text-cyan-400 led-glow-cyan tracking-wider">
            {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
          </div>
        </div>

        {/* Right: Active Service Identifier */}
        <div className="md:col-span-4 flex flex-col items-start md:items-end">
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/10 border-2 border-amber-500/60 text-amber-300 px-4 py-2 rounded-xl">
            <span className="w-3 h-3 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="font-extrabold text-base md:text-lg tracking-wider font-sans uppercase">
              {t.serviceIdentifier}
            </span>
          </div>
          <div className="text-xs text-slate-400 font-mono mt-1">
            GATE #4 ENTRANCE • BATCH ID: SD-2026-B16
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. SRIVARI DARSHANAM STATUS CARD */}
      {/* ========================================================================= */}
      <section className={`my-4 lg:my-5 p-4 lg:p-5 rounded-2xl border-2 transition-all duration-500 ${shrineConfig.bg} ${shrineConfig.boxGlow}`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            {/* Swamy Small Symbol Avatar */}
            <div className="w-12 h-12 rounded-xl border border-amber-400/80 overflow-hidden flex-shrink-0 shadow-md">
              <img src="./venkateswara_swamy.jpg" alt="Swamy Icon" className="w-full h-full object-cover" />
            </div>

            <div>
              <h2 className={`text-xl md:text-2xl lg:text-3xl font-black tracking-wide ${shrineConfig.glow}`}>
                {shrineConfig.title}
              </h2>
              <p className="text-sm md:text-base text-slate-200 font-medium mt-0.5">
                {shrineConfig.sub}
              </p>
            </div>
          </div>

          <div className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold border uppercase tracking-wider ${shrineConfig.badgeBg}`}>
            SANCTUM AUTO-SYNCED
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. CENTRAL HERO COUNTDOWN BLOCK (Primary Focal Point for 55" Display) */}
      {/* ========================================================================= */}
      <main className="relative my-2 lg:my-4">
        
        {/* Door Unlatching Alarm Strobe Overlay (State 00:00:00) */}
        {isDoorUnlatched ? (
          <div className="p-8 lg:p-12 bg-gradient-to-b from-red-600 via-rose-700 to-red-900 border-4 border-white rounded-3xl shadow-[0_0_80px_rgba(239,68,68,1)] text-center animate-pulse">
            
            <div className="flex items-center justify-center space-x-4 mb-4">
              <img src="./venkateswara_swamy.jpg" className="w-16 h-16 rounded-2xl border-2 border-amber-300 shadow-xl object-cover" />
              <div className="inline-block bg-black/60 px-6 py-2 rounded-full text-amber-300 font-mono text-sm md:text-lg font-bold tracking-widest uppercase border border-amber-400">
                {t.doorUnlatchHeader}
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white led-glow-red tracking-tight leading-tight uppercase my-4">
              {t.doorUnlatchTitle}
            </h1>

            <p className="text-xl md:text-2xl text-rose-100 font-bold max-w-3xl mx-auto mt-2">
              {t.doorUnlatchSub}
            </p>

            {/* Audio Visualizer Waves */}
            <div className="flex items-center justify-center space-x-2 mt-8 h-16">
              {[...Array(14)].map((_, i) => (
                <div
                  key={i}
                  className="w-3 bg-white rounded-full animate-soundwave"
                  style={{
                    animationDuration: `${0.6 + (i % 5) * 0.2}s`,
                    animationDelay: `${(i % 3) * 0.1}s`
                  }}
                ></div>
              ))}
            </div>
          </div>
        ) : (
          /* Main Countdown Readout */
          <div className={`p-6 lg:p-10 bg-[#111A2E] border-4 rounded-3xl text-center shadow-2xl transition-all duration-300 relative ${isAssemblyWarning ? 'border-amber-500 box-glow-yellow' : 'border-slate-700/80'}`}>
            
            {/* Assembly Warning Top Pill */}
            {isAssemblyWarning && (
              <div className="inline-flex items-center space-x-2 bg-amber-500 text-slate-950 font-black text-sm md:text-base lg:text-lg px-6 py-2 rounded-full mb-6 animate-bounce shadow-xl">
                <span>{t.assemblyWarning}</span>
              </div>
            )}

            {/* HUGE MONOSPACE COUNTDOWN DISPLAY (Readable from 30ft) */}
            <div className="flex items-center justify-center space-x-2 sm:space-x-4 md:space-x-8 font-mono my-2">
              {/* HOURS */}
              <div className="flex flex-col items-center">
                <div className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold px-3 py-2 sm:px-6 sm:py-4 bg-[#0B1120] border-2 border-slate-700/80 rounded-2xl ${isAssemblyWarning ? 'text-amber-400 led-glow-yellow' : 'text-emerald-400 led-glow-green'}`}>
                  {hours}
                </div>
                <span className="text-xs sm:text-sm md:text-base font-bold text-slate-400 mt-3 tracking-widest">
                  HOURS
                </span>
              </div>

              <span className={`text-5xl sm:text-7xl md:text-8xl font-black pb-8 ${isAssemblyWarning ? 'text-amber-400' : 'text-emerald-400'} animate-pulse`}>:</span>

              {/* MINUTES */}
              <div className="flex flex-col items-center">
                <div className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold px-3 py-2 sm:px-6 sm:py-4 bg-[#0B1120] border-2 border-slate-700/80 rounded-2xl ${isAssemblyWarning ? 'text-amber-400 led-glow-yellow' : 'text-emerald-400 led-glow-green'}`}>
                  {minutes}
                </div>
                <span className="text-xs sm:text-sm md:text-base font-bold text-slate-400 mt-3 tracking-widest">
                  MINUTES
                </span>
              </div>

              <span className={`text-5xl sm:text-7xl md:text-8xl font-black pb-8 ${isAssemblyWarning ? 'text-amber-400' : 'text-emerald-400'} animate-pulse`}>:</span>

              {/* SECONDS */}
              <div className="flex flex-col items-center">
                <div className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold px-3 py-2 sm:px-6 sm:py-4 bg-[#0B1120] border-2 border-slate-700/80 rounded-2xl ${isAssemblyWarning ? 'text-amber-400 led-glow-yellow' : 'text-emerald-400 led-glow-green'}`}>
                  {seconds}
                </div>
                <span className="text-xs sm:text-sm md:text-base font-bold text-slate-400 mt-3 tracking-widest">
                  SECONDS
                </span>
              </div>
            </div>

            {/* EXPECTED TIME TO DARSHAN & RE-ENTRY CUTOFF SECONDARY READOUTS */}
            <div className="mt-8 pt-6 border-t-2 border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              
              {/* EXPECTED TIME TO DARSHAN */}
              <div className="bg-[#0B1120]/80 p-4 rounded-2xl border border-cyan-500/40 flex items-center justify-between shadow-lg">
                <div className="text-left">
                  <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center space-x-1">
                    <span>{t.expectedDarshanLabel}</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-black font-mono text-cyan-300 led-glow-cyan mt-0.5">
                    {getExpectedDarshanTime()}
                  </div>
                </div>
                <div className="bg-cyan-500/20 text-cyan-300 p-3 rounded-xl border border-cyan-400/40">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>

              {/* Re-Entry Cutoff Badge */}
              <div className={`p-4 rounded-2xl border flex items-center justify-between ${isReentryActive ? 'bg-emerald-950/40 border-emerald-500/40' : 'bg-rose-950/40 border-rose-500/40'}`}>
                <div className="text-left">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {t.reentryCutoffLabel} <span className="text-slate-500">{t.reentryNote}</span>
                  </div>
                  <div className={`text-2xl sm:text-3xl font-black font-mono ${isReentryActive ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {getReentryCutoffTime()}
                  </div>
                </div>

                <div className={`px-3 py-1.5 rounded-lg text-xs font-extrabold border ${isReentryActive ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40' : 'bg-rose-500/20 text-rose-300 border-rose-400/40'}`}>
                  {isReentryActive ? t.reentryStatusActive : t.reentryStatusClosed}
                </div>
              </div>

            </div>

          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* 4. FOOTER TICKER / FACILITY BAR */}
      {/* ========================================================================= */}
      <footer className="mt-4 lg:mt-6 bg-[#111A2E] border-2 border-slate-700/80 rounded-2xl overflow-hidden shadow-2xl flex items-center">
        <div className="bg-amber-500 text-slate-950 font-black px-4 py-3 text-xs md:text-sm uppercase tracking-widest flex items-center space-x-2 z-10 flex-shrink-0">
          <span>📢 NOTICE</span>
        </div>

        <div className="relative overflow-hidden w-full py-3 bg-[#0B1120]/90">
          <div className="inline-block whitespace-nowrap animate-marquee font-semibold text-sm md:text-base text-slate-200">
            {t.ticker.map((item, idx) => (
              <span key={idx} className="mx-8 inline-flex items-center">
                {item}
              </span>
            ))}
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* 5. INTERACTIVE DEMO CONTROLS (Floating Debug Panel) */}
      {/* ========================================================================= */}
      {showDebug ? (
        <div className="fixed bottom-4 right-4 z-50 bg-[#111A2E]/95 border-2 border-cyan-500/60 p-4 rounded-2xl shadow-2xl max-w-sm text-xs space-y-3 backdrop-blur-md">
          <div className="flex items-center justify-between pb-2 border-b border-slate-700">
            <span className="font-extrabold text-cyan-400 uppercase tracking-wider flex items-center space-x-1">
              <span>⚡ VQC DEBUG CONTROLS</span>
            </span>
            <button
              onClick={() => setShowDebug(false)}
              className="text-slate-400 hover:text-white font-bold px-2 py-0.5 rounded bg-slate-800"
            >
              ✕ Hide
            </button>
          </div>

          {/* Srivari Darshanam State Switcher */}
          <div>
            <label className="block text-slate-400 font-bold mb-1">Srivari Darshanam State:</label>
            <div className="grid grid-cols-3 gap-1">
              <button
                onClick={() => setDarshanState('GREEN')}
                className={`py-1 rounded font-bold transition-all ${darshanState === 'GREEN' ? 'bg-emerald-500 text-black shadow-lg' : 'bg-slate-800 text-emerald-400'}`}
              >
                🟢 Normal
              </button>
              <button
                onClick={() => setDarshanState('YELLOW')}
                className={`py-1 rounded font-bold transition-all ${darshanState === 'YELLOW' ? 'bg-amber-500 text-black shadow-lg' : 'bg-slate-800 text-amber-400'}`}
              >
                🟡 Protocol
              </button>
              <button
                onClick={() => setDarshanState('RED')}
                className={`py-1 rounded font-bold transition-all ${darshanState === 'RED' ? 'bg-rose-500 text-white shadow-lg' : 'bg-slate-800 text-rose-400'}`}
              >
                🔴 Seva Hold
              </button>
            </div>
          </div>

          {/* Quick Jump Timer Shortcuts */}
          <div>
            <label className="block text-slate-400 font-bold mb-1">Timer Fast-Forward:</label>
            <div className="grid grid-cols-3 gap-1">
              <button
                onClick={() => setTotalSeconds(1455)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 py-1 rounded font-mono"
              >
                24m 15s
              </button>
              <button
                onClick={() => setTotalSeconds(120)}
                className="bg-amber-950 border border-amber-500 text-amber-300 py-1 rounded font-mono font-bold"
              >
                02m 00s ⚠️
              </button>
              <button
                onClick={() => setTotalSeconds(0)}
                className="bg-rose-950 border border-rose-500 text-rose-300 py-1 rounded font-mono font-bold"
              >
                00m 00s 🔔
              </button>
            </div>
          </div>

          {/* Pause / +15m Extensions */}
          <div className="grid grid-cols-2 gap-1 pt-1">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="bg-slate-800 hover:bg-slate-700 text-cyan-300 py-1.5 rounded font-bold"
            >
              {isPaused ? '▶️ Resume' : '⏸️ Pause Timer'}
            </button>
            <button
              onClick={() => setTotalSeconds((prev) => prev + 900)}
              className="bg-amber-900/60 hover:bg-amber-800 text-amber-200 py-1.5 rounded font-bold border border-amber-600/40"
            >
              ⏳ +15 Min Hold
            </button>
          </div>

          {/* Multilingual Switcher */}
          <div>
            <label className="block text-slate-400 font-bold mb-1">Language Display:</label>
            <div className="grid grid-cols-3 gap-1">
              {['EN', 'TE', 'HI'].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`py-1 rounded font-bold ${lang === l ? 'bg-cyan-500 text-black' : 'bg-slate-800 text-slate-300'}`}
                >
                  {l === 'EN' ? 'English' : l === 'TE' ? 'తెలుగు' : 'हिंदी'}
                </button>
              ))}
            </div>
          </div>

          {/* Sound & LED Matrix Filter Controls */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px]">
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                if (window.vqcAudio) window.vqcAudio.playChime();
              }}
              className={`px-2 py-1 rounded font-bold ${soundEnabled ? 'bg-emerald-950 text-emerald-300 border border-emerald-500' : 'bg-slate-800 text-slate-400'}`}
            >
              {soundEnabled ? '🔊 Chime ON' : '🔇 Muted'}
            </button>

            <button
              onClick={() => setLedMatrixEffect(!ledMatrixEffect)}
              className={`px-2 py-1 rounded font-bold ${ledMatrixEffect ? 'bg-cyan-950 text-cyan-300 border border-cyan-500' : 'bg-slate-800 text-slate-400'}`}
            >
              {ledMatrixEffect ? '📺 55" LED Grid' : '🖥️ Crisp Flat'}
            </button>
          </div>

        </div>
      ) : (
        <button
          onClick={() => setShowDebug(true)}
          className="fixed bottom-4 right-4 z-50 bg-cyan-600 text-slate-950 font-black px-4 py-2 rounded-full shadow-2xl text-xs hover:bg-cyan-400 transition-all"
        >
          ⚙️ Open VQC Control Panel
        </button>
      )}

    </div>
  );
}

// Render React App
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<VQCDisplayBoard />);
