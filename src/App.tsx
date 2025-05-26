import { ArrowRight, Loader } from "lucide-react";
import { useState } from "react";
import "./App.css";
import { Chat } from "./components/chat";

function App() {
  const [value, setValue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // if (response) {
  //   return (
  //     <section className="flex w-full gap-8 items-center justify-center h-screen">
  //       {response?.map((item) => {
  //         return (
  //           <article>
  //             <div
  //               style={{ backgroundColor: item.color }}
  //               className={`w-[150px] flex flex-col gap-2 h-[150px] ${
  //                 colord(item.color).isLight() ? "text-black" : "text-white"
  //               } rounded-md`}
  //               key={item.value}
  //             >
  //               <span>{item.value}</span>
  //               <span>{item.color}</span>
  //             </div>
  //             <p>{item.name}</p>
  //           </article>
  //         );
  //       })}
  //     </section>
  //   );
  // }

  if (submitted) {
    const chatId = "3";
    return <Chat initMessage={value} chatId={chatId} />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full gap-8 items-center justify-center h-screen"
    >
      <label className="flex flex-col w-full gap-8">
        <span className="text-5xl font-black text-center">
          Let's start generating your branding
        </span>

        <textarea
          value={value}
          className="min-h-[160px] w-full max-h-[250px] p-4 border-2 border-slate-300 rounded-2xl"
          placeholder="Tell me about your company and we'll start generate a branding for you..."
          onChange={(event) => {
            setValue(event.target.value);
          }}
        ></textarea>
      </label>
      <button
        disabled={submitted}
        className="w-full flex gap-2 items-center justify-center mx-4 cursor-pointer bg-slate-900 hover:bg-slate-800 text-white rounded-md py-4 px-4"
      >
        {submitted ? (
          <>
            Loading...
            <Loader width={16} height={16} className="inline-block" />
          </>
        ) : (
          <>
            Start generate my branding
            <ArrowRight width={16} height={16} className="inline-block" />
          </>
        )}
      </button>
    </form>
  );
}

export default App;
