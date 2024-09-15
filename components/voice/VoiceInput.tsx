
export default async function VoiceInput() {
  let result = '';

  let recognition = new (window as any).webkitSpeechRecognition();
  recognition.lang = 'en-US';
  recognition.interimResults = true;
  recognition.continuous = true;
  recognition.start();
  recognition.onresult = (event: any) => {
    console.log(event.results);
    result = event.results[event.results.length - 1][0].transcript;
  };
  recognition.onerror = (event: any) => {
    console.log(event.error);
  };
  recognition.onend = () => {
    console.log('recognition ended');
  };

  // const synth = window.speechSynthesis;
  // const utterance = new SpeechSynthesisUtterance();
  // utterance.text = result;
  // synth.speak(utterance);

  const keywords = ["university", "department", "degree", "syllabus", "semester", "batch", "division", "course", "chapter", "assignment", "quiz", "test", "exam", "grade", "result"];

  keywords.forEach(keyword => {
    let found = result.search(keyword);
    if (found !== -1) {
      // result.substring(found, )
    }
  })

  const commands = [
    {
      command: 'hello',
      callback: () => console.log('Hello!'),
    },
    {
      command: 'goodbye',
      callback: () => console.log('Goodbye!'),
    },
    {
      command: 'open *',
      callback: (website: string) => {
        console.log('Opening', website);
        window.open(`https://${website}.com`, '_blank');
      },
    },
    {
      command: 'search *',
      callback: (query: string) => {
        console.log('Searching for', query);
        window.open(`https://google.com/search?q=${query}`, '_blank');
      },
    },
    {
      command: 'navigate *',
      callback: (path: string) => {
        console.log('Navigating to', path);
        window.location.href = path;
      },
    },
    {
      command: 'scroll *',
      callback: (direction: string) => {
        console.log('Scrolling', direction);
        window.scrollBy(0, direction === 'up' ? -100 : 100);
      },
    },
    {
      command: 'voice input',
      callback: () => {
        console.log('Voice input');
        recognition.start();
      },
    },
    {
      command: 'voice output',
      callback: () => {
        console.log('Voice output');
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance();
        utterance.text = result;
        synth.speak(utterance);
      },
    },
  ];

  return (
    <div>
      <h1>Voice Input</h1>
    </div>
  );
}
