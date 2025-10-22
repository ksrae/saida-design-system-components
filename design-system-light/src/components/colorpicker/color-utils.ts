/**
 * 색상 관련 유틸리티 함수들을 모은 모듈입니다.
 */

/**
 * HEX 문자열에서 RGB 배열로 변환
 */
export function hexToRgb(hex: string): [number, number, number] {
	const bigint = parseInt(hex.slice(1), 16);
	const r = (bigint >> 16) & 255;
	const g = (bigint >> 8) & 255;
	const b = bigint & 255;
	return [r, g, b];
}

export function rgbToHex(r: number, g: number, b: number): string {
	return (
		'#' +
		[r, g, b]
			.map(x => {
				const hex = x.toString(16);
				return hex.length === 1 ? '0' + hex : hex;
			})
			.join('')
	);
}

export function rgbToHsb(r: number, g: number, b: number): [number, number, number] {
	r /= 255;
	g /= 255;
	b /= 255;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	const diff = max - min;
	
	let h = 0;
	if (diff !== 0) {
		if (max === r) {
			h = ((g - b) / diff) % 6;
		} else if (max === g) {
			h = (b - r) / diff + 2;
		} else {
			h = (r - g) / diff + 4;
		}
		h *= 60;
	}
	if (h < 0) h += 360;
	
	const s = max === 0 ? 0 : (diff / max) * 100;
	const v = max * 100;
	
	return [h, s, v];
}

export function hsbToRgb(h: number, s: number, b: number): [number, number, number] {
	if(h >= 360) h = 0;
	
	s /= 100;
	b /= 100;
	const c = b * s;
	const x = c * (1 - Math.abs((h / 60) % 2 - 1));
	const m = b - c;
	
	let r = 0, g = 0, bl = 0;
	if (0 <= h && h < 60) {
		[r, g, bl] = [c, x, 0];
	} else if (60 <= h && h < 120) {
		[r, g, bl] = [x, c, 0];
	} else if (120 <= h && h < 180) {
		[r, g, bl] = [0, c, x];
	} else if (180 <= h && h < 240) {
		[r, g, bl] = [0, x, c];
	} else if (240 <= h && h < 300) {
		[r, g, bl] = [x, 0, c];
	} else if (300 <= h && h < 360) {
		[r, g, bl] = [c, 0, x];
	}
	
	return [
		Math.round((r + m) * 255),
		Math.round((g + m) * 255),
		Math.round((bl + m) * 255)
	];
}

/**
 * RGB 색상값을 HSL 색상값으로 변환합니다.
 * @param r Red 값 (0-255)
 * @param g Green 값 (0-255)
 * @param b Blue 값 (0-255)
 * @returns [h, s, l] 배열 (h: 0-360도, s: 0-100%, l: 0-100%)
 */
export function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h *= 60;
  }

  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
}

export function isValidFormat(value: string, format: string): boolean {
  if (!value) return false;
  
  switch (format) {
    case 'hex':
      return /^#([0-9A-F]{6})$/i.test(value);
    case 'rgb':
      return /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/.test(value);
    case 'hsb':
      return /^hsb\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\)$/.test(value);
    default:
      return false;
  }
}