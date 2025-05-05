import { useState } from "react";
import axios from "axios";
const apiKey = import.meta.env.VITE_API_KEY;

export default function App() {
    const [texts, setText] = useState("");
    const [otvet, setOtvet] = useState("");
    const [Message, SetMassage] = useState([]);

    async function bbbb() {
        SetMassage((Messages) => [
            ...Messages,
            {
                id: Messages.length,
                OldMessage: texts,
            },
        ]);
        try {
            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
                {
                    contents: [
                        {
                            parts: [{ text: texts }],
                        },
                    ],
                }
            );
            const raw = response.data.candidates[0].content.parts[0].text;
            setOtvet(raw);
        } catch (error) {
            console.error(error);
            setOtvet("Қате орын алды.");
        }
    }

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 space-y-4 ">
                <h1 className="text-2xl text-center text-blue-600">Chat Ai</h1>

                <div className="space-y-2 max-h-60 overflow-y-auto">
                    {Message.map((Mess) => (
                        <div
                            key={Mess.id}
                            className="p-2 bg-blue-50 border border-blue-200 rounded-md"
                        >
                            <p className="text-gray-700">
                                Сұрақ: {Mess.OldMessage}
                            </p>
                        </div>
                    ))}
                </div>

                <input
                    type="text"
                    placeholder="Сұрақты жазыңыз"
                    value={texts}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 "
                />

                <button
                    onClick={bbbb}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white  py-2 rounded-md transition "
                >
                    Отправит
                </button>

                {otvet && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-md ">
                        {otvet}
                    </div>
                )}
            </div>
        </div>
    );
}
