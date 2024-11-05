const { v4: uuidv4 } = require("uuid");

async function createOne(file) {
  const duration = file.duration;
  const piece = Math.floor((duration - 60) / 12);
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(
        JSON.stringify({
          name: "AI Parse Video",
          size: 18117374,
          type: "video/mp4",
          sections: [
            {
              id: uuidv4(),
              title: "Introduction",
              clips: [
                {
                  id: uuidv4(),
                  minutes: 0,
                  seconds: 0,
                  duration: piece,
                  text: "Hello, welcome to the video!",
                },
                {
                  id: uuidv4(),
                  minutes: Math.floor((piece + 5 + 5) / 60),
                  seconds: (piece + 5) % 60,
                  duration: piece,
                  text: "Today, we'll be showcasing our latest inovation.",
                },
              ],
            },
            {
              id: uuidv4(),
              title: "Key Features",
              clips: [
                {
                  id: uuidv4(),
                  minutes: Math.floor(((piece + 5) * 2) / 60),
                  seconds: ((piece + 5) * 2) % 60,
                  duration: piece,
                  text: "Our product has three main features.",
                },
                {
                  id: uuidv4(),
                  minutes: Math.floor(((piece + 5) * 3) / 60),
                  seconds: ((piece + 5) * 3) % 60,
                  duration: piece,
                  text: "First, it's incredibly easy to use.",
                },
                {
                  id: uuidv4(),
                  minutes: Math.floor(((piece + 5) * 4) / 60),
                  seconds: ((piece + 5) * 4) % 60,
                  duration: piece,
                  text: "Second, it's highly efficient.",
                },
                {
                  id: uuidv4(),
                  minutes: Math.floor(((piece + 5) * 5) / 60),
                  seconds: ((piece + 5) * 5) % 60,
                  duration: piece,
                  text: "And third, it's cost-effective.",
                },
              ],
            },
            {
              id: uuidv4(),
              title: "Demonstration",
              clips: [
                {
                  id: uuidv4(),
                  minutes: Math.floor(((piece + 5) * 6) / 60),
                  seconds: ((piece + 5) * 6) % 60,
                  duration: piece,
                  text: "Let me show you how it works.",
                },
                {
                  id: uuidv4(),
                  minutes: Math.floor(((piece + 5) * 7) / 60),
                  seconds: ((piece + 5) * 7) % 60,
                  duration: piece,
                  text: "Simply press this button to start.",
                },
                {
                  id: uuidv4(),
                  minutes: Math.floor(((piece + 5) * 8) / 60),
                  seconds: ((piece + 5) * 8) % 60,
                  duration: piece,
                  text: "The interface is intuitive and user-friendly.",
                },
              ],
            },
            {
              id: uuidv4(),
              title: "Demonstration",
              clips: [
                {
                  id: uuidv4(),
                  minutes: Math.floor(((piece + 5) * 9) / 60),
                  seconds: ((piece + 5) * 9) % 60,
                  duration: piece,
                  text: "In conclusion, our product is a game-changer.",
                },
                {
                  id: uuidv4(),
                  minutes: Math.floor(((piece + 5) * 10) / 60),
                  seconds: ((piece + 5) * 10) % 60,
                  duration: piece,
                  text: "We're excited to bring this to market.",
                },
                {
                  id: uuidv4(),
                  minutes: Math.floor(((piece + 5) * 11) / 60),
                  seconds: ((piece + 5) * 11) % 60,
                  duration: piece,
                  text: "Thank you for your attention.",
                },
              ],
            },
          ],
        })
      );
    }, 1000)
  );
}
module.exports = {
  createOne,
};
