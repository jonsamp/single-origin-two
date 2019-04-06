import { Audio } from 'expo';

export default async function playSound({ sound }) {
  const soundObject = new Audio.Sound();
  try {
    await soundObject.loadAsync(sound);
    await soundObject.playAsync();
  } catch (error) {
    console.log('Error playing sound: ', error);
  }
}
