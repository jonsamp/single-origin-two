import { Audio } from 'expo-av';

export default async function playSound({ sound }: { sound: number }) {
  const soundObject = new Audio.Sound();
  try {
    await soundObject.loadAsync(sound);
    await soundObject.playAsync();
  } catch (error) {
    console.error('Error playing sound: ', error);
  }
}
