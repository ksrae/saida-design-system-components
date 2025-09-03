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
export function getAssignedNodesContent(host: HTMLElement): string {
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
// export function format(first?: string, middle?: string, last?: string): string {
//   return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
// }
