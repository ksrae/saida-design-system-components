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