import { Injectable } from "@nestjs/common";

@Injectable()
export class ShortenerHelper {
  removeVowelsFromBasicUrl(url: string): string {
    url = this.removeUrlPathAndParameters(url);
    const vowels = /[aeiouAEIOU]/g;
    return url.replace(vowels, '');
  }

  generateRandomString(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }

  convertDateToLastThreeDigits(): number {
    const dateInMillis = +new Date();
    return Math.floor(dateInMillis / 3333) % 1000;
  }

  shuffleString(inputString: string): string {
    const characters = inputString.split('');
    let shuffledString = '';

    while (characters.length > 0) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      shuffledString += characters.splice(randomIndex, 1);
    }

    return shuffledString;
  }

  removeUrlPathAndParameters(url: string): string {
    const urlObject = new URL(url);
    return urlObject.origin;
  }

  generatorShorterUrl(url: string): string {
    return (
      url + '/' + this.shuffleString(this.generateRandomString() + this.convertDateToLastThreeDigits())
    );
  }
}
