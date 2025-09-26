/**
 * Light DOM 환경에서 slot 태그를 제외한 모든 자식 노드를 slot에 할당된 콘텐츠로 간주하여 문자열로 반환합니다.
 * - Shadow DOM이 꺼진 Stencil 컴포넌트에서 slot API가 동작하지 않을 때 사용합니다.
 * - <slot> 태그를 제외한 모든 자식 노드(요소, 텍스트)를 합쳐서 반환합니다.
 * - 실제로 slot에 들어가는 콘텐츠와 동일하게 동작합니다.
 *
 * @param host Stencil 컴포넌트의 루트 HTMLElement
 * @returns slot에 들어간 콘텐츠의 HTML 문자열
 */
// slot 태그를 제외한 모든 자식 노드를 slot 콘텐츠로 처리 (Light DOM 대응)
export function fnGetAssignedNodesContent(host: HTMLElement): string {
	return Array.from(host.childNodes)
		.filter(node =>
			node.nodeType === Node.ELEMENT_NODE && (node as HTMLElement).tagName !== 'SLOT' ||
			(node.nodeType === Node.TEXT_NODE && node.textContent?.trim())
		)
		.map(node =>
			node.nodeType === Node.ELEMENT_NODE ? (node as HTMLElement).outerHTML : node.textContent || ''
		)
		.join('')
		.trim();
}

// 특정 tagName을 가진 slot 할당 요소들을 배열로 반환합니다.
export function fnGetChildrenByTagName(parentElement: HTMLElement, childTagName: string): any[] {
	if (!parentElement) {
		return [];
	}

	return Array.from(parentElement.children).filter(
		(child: any) => child.tagName.toLowerCase() === childTagName.toLowerCase()
	) as any[];
}

// 특정 태그 이름을 가진 부모 요소가 존재하는지 확인하는 함수
export function fnFindClosestParentByTagName(host: HTMLElement, tagName: string): boolean {
  let parent = host.parentElement;

  while (parent) {
    if (parent.tagName.toLowerCase() === tagName.toLowerCase()) {
      return true; // 원하는 부모 태그를 찾으면 true 반환
    }
    parent = parent.parentElement; // 부모 요소를 계속 탐색
  }

  return false; // body까지 탐색했지만 원하는 부모 태그를 찾지 못한 경우 false 반환
}

// 특정 이름의 slot에 콘텐츠가 있는지 확인하는 함수
export function fnHasSlotContentByName(host: HTMLElement, slotName: string): boolean {
	if (!host.isConnected) return false;
	return !!host.querySelector(`[slot="${slotName}"]`);
}

/**
 * Resolve a prop value from element attributes supporting a canonical attribute
 * name and one or more legacy alias attribute names.
 *
 * Usage example:
 *   this.confirmText = fnResolvePropAlias(this.el, 'confirmText', 'confirm-text', this.confirmText);
 *
 * Priority rules:
 * - If the canonical attribute is present on the element, its presence (or value) wins.
 * - Otherwise, if any alias attribute (string or array) is present, the first non-null
 *   alias value is returned.
 * - If neither is present, the provided currentValue is returned.
 *
 * This function is defensive and returns currentValue on any error.
 */
/**
	* camelCase 속성과 snake-case 별칭 속성을 지원하는 함수.
	* Prop({ attribute: ... })에서는 하나의 alias만 지정할 수 있는데 개발자의 성향이나 js 버전 간의 문제를 해결하기 위해,
	* 유틸리티 함수로 다른 하나를 지원하거나 두 가지 모두를 지원하는 방식을 권장합니다.
	* 이 함수는 각 component의 componentWillLoad()에서 호출하여 사용합니다.
	* 단, 반드시 mutable: true 옵션이 있어야 합니다.
	* 예: 
	* @Element() el: HTMLElement;
	* 
	* case 1: 두 가지 alias를 모두 지원
	* @Prop() isConfirm: boolean = false;
	* this.isConfirm = fnAssignPropFromAlias(this.el, 'isConfirm', 'is-confirm') ?? this.isConfirm;
	* 
	* case 2: 하나는 Prop에서 지정하고 다른 하나는 이 함수에서 지원
	* @Prop({ attribute: 'isConfirm' }) isConfirm: boolean = false;
	* this.isConfirm = fnAssignPropFromAlias(this.el, 'is-confirm') ?? this.isConfirm;
 *
 * This makes simple calls like:
 *   this.overflowCount = fnAssignPropFromAlias<number>(this.host, 'overflow-count') ?? this.overflowCount;
 */
export function fnAssignPropFromAlias<T = string>(host: HTMLElement, ...aliases: string[]): T | null {
	try {
		const v = fnResolvePropAlias(host, ...aliases);
		if (v == null) return null;

		const trimmed = v.trim();
		// boolean
		if (trimmed === 'true' || trimmed === 'false' || trimmed === '1' || trimmed === '0') {
			const b = trimmed === 'true' || trimmed === '1';
			return (b as unknown) as T;
		}

		// number: accept plain numeric strings (including decimals)
		const n = Number(trimmed);
		if (!Number.isNaN(n) && trimmed !== '') {
			return (n as unknown) as T;
		}

		// fallback to string
		return (v as unknown) as T;
	} catch (e) {
		return null;
	}
}

export function fnResolvePropAlias(host: HTMLElement, ...aliasAttr: string[]): string | null {
	try {
		if (!host) return null;
		const aliases = aliasAttr && aliasAttr.length ? aliasAttr : [];
		const seen = new Set<string>();
		const toKebab = (s: string) => s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
		const toCamel = (s: string) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

		for (const a of aliases) {
			if (!a) continue;
			const variants = [a, toKebab(a), toCamel(a)];
			for (const vName of variants) {
				if (seen.has(vName)) continue;
				seen.add(vName);
				const v = host.getAttribute(vName);
				if (v !== null) return v;
			}
		}
		return null;
	} catch (e) {
		return null;
	}
}