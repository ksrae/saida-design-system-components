import { LitElement, CSSResultGroup, css, unsafeCSS, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from "lit/directives/style-map.js";
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import globalCSS from './styles/modal.scss?inline';
import '../icon/icon.element';
// import '../spinner/spinner.element';

@customElement('sy-modal')
export class ModalElement extends LitElement {
	static styles: CSSResultGroup = css`${unsafeCSS(globalCSS)};

	`
	@property({ type: String }) cancelText: string = '';
	@property({ type: Boolean }) closable: boolean = false;
	@property({ type: Boolean }) enableModalMaximize: boolean = false;
	@property({ type: Boolean }) hideFooter = false;
	@property({ type: Boolean }) maskClosable: boolean = false;
  // @property({ type: Boolean }) maskless: boolean = false;
	@property({ type: String }) okText: string = '';
  @property({ type: Boolean }) open = false;
	@property({ type: Number }) width: number = 0;
	@property({ type: String }) top: string = '-1';  // number 대신 string으로 변경
	@property({ type: String }) left: string = '-1';  // number 대신 string으로 변경
	@property({ type: String }) variant: 'modal' | 'dialog' = 'dialog';
	
  @state() private maximized = false;
	@state() private isCustomHeader: boolean = false;
	@state() private isCustomFooter: boolean = false;
	@state() private modalWidth: string = '';

	// 버튼 전체를 바꾸려면 footer를 바꾸고,
	// 버튼 안에 내용만 바꾸려면 slot을 사용해라.

  private dragging = false;
  private offsetX = 0;
  private offsetY = 0;
  private startX = 0;
  private startY = 0;
	private startWidth = 0;
	private startHeight = 0;
	private startLeft = 0;
	private startTop = 0;
	private resizeHandle: DOMTokenList | null = null;
	private addedToBody = false;
	private scrollsize = 15;
	private minWidth = 100;
	private minHeight = 1;


  connectedCallback() {
    super.connectedCallback();
    // document level에서 이벤트 리스너 등록 
    document.addEventListener("keydown", this.handleKeydown.bind(this));
  }

  async firstUpdated() {
    await this.updateComplete;

		if (this.top === undefined) {
      this.top = '-1';
    }
    if (this.left === undefined) {
      this.left = '-1';
    }
	}

  updated(changedProperties: Map<string | number | symbol, unknown>): void {
    // undefined인 경우에만 -1로 설정 (0은 의도적인 값으로 유지)
    if (this.top === undefined) {
      this.top = '-1';
    }
    if (this.left === undefined) {
      this.left = '-1';
    }

    if (changedProperties.has('open')) {
      if(this.open) {
        this.setOpen();
      } else {
        this.removeModal();
      }
    }
		if (changedProperties.has('width')) {
			// width가 변경되면 modalWidth를 업데이트
			this.modalWidth = this.width > 0 ? `${this.width}px` : 'auto';
		}
  }
	
  disconnectedCallback() {
    super.disconnectedCallback();
    // document level에서 이벤트 리스너 제거
    document.removeEventListener("keydown", this.handleKeydown.bind(this));
    this.removeModal();
  }
  
	// functions
	public setOpen() {
	if(!this.open) {
		this.open = true;
	}
	this.appendToRoot();

		Promise.resolve().then(() => {
			this.setModalPosition();
			this.isCustomFooter = this.hasSlotContents('footer');
			this.requestUpdate();
		});
	}
	public setClose(value?: any) {
		this.closeModal('close', value);
	}
	public setCancel(value?: any) {
		this.closeModal('cancel', value);
	}
	public setOk(value?: any) {
		this.closeModal('ok', value);
	}
	public setMaximum() {
		if (this.variant === 'modal' && this.enableModalMaximize) {
			this.maximized = !this.maximized;
			
			const modalContainer = this.shadowRoot?.querySelector('.modal-container') as HTMLElement;
			if (modalContainer) {
				if (this.maximized) {
					// 원래 위치와 크기 저장
					this.startLeft = modalContainer.offsetLeft;
					this.startTop = modalContainer.offsetTop;
					this.startWidth = modalContainer.offsetWidth;
					// this.startHeight = modalContainer.offsetHeight;
					
					// 최대화 상태로 설정
					modalContainer.style.left = '0';
					modalContainer.style.top = '0';
					this.modalWidth = '100%';
					modalContainer.style.height = '100%';
				} else {
					// 원래 크기와 위치로 복원
					modalContainer.style.left = `${this.startLeft}px`;
					modalContainer.style.top = `${this.startTop}px`;
					this.modalWidth = `${this.startWidth}px`;
					modalContainer.style.height = `auto`; 
				}
			}
			this.requestUpdate();
		}
	}

	render() {
		return html`
        <div class=${classMap({
            'modal-wrapper': true,
            "modal-wrapper--open": this.open,
						'modal-wrapper--maximize': this.maximized && this.variant === 'modal',
						'mask': true, // !this.maskless
        })}
        @click=${this.handleWrapperClick}>
            <div 
							class="modal-container"
							style=${styleMap({
								width: this.modalWidth
							})}
							@click=${(e: Event) => e.stopPropagation()}
						>
                <div class=${classMap({
                    'modal-header': true,
                    'draggable': this.variant === 'modal',
                })}
                @mousedown=${this.onMouseDown}
								@click=${(e: Event) => e.stopPropagation()}>
                    <div class="header-title">
                        <slot name="header" @slotchange=${this.handleChangeHeader}></slot>
                        ${this.isCustomHeader ? nothing : 'Modal'}
                    </div>
										<div class="header-button-container">
										${this.variant === 'modal' && this.enableModalMaximize ? 
											this.maximized ? 
												html`<sy-icon 
													selectable 
													size="large"
													@selected=${this.handleMaximized}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M256 120C256 106.7 245.3 96 232 96C218.7 96 208 106.7 208 120L208 208L120 208C106.7 208 96 218.7 96 232C96 245.3 106.7 256 120 256L232 256C245.3 256 256 245.3 256 232L256 120zM120 384C106.7 384 96 394.7 96 408C96 421.3 106.7 432 120 432L208 432L208 520C208 533.3 218.7 544 232 544C245.3 544 256 533.3 256 520L256 408C256 394.7 245.3 384 232 384L120 384zM432 120C432 106.7 421.3 96 408 96C394.7 96 384 106.7 384 120L384 232C384 245.3 394.7 256 408 256L520 256C533.3 256 544 245.3 544 232C544 218.7 533.3 208 520 208L432 208L432 120zM408 384C394.7 384 384 394.7 384 408L384 520C384 533.3 394.7 544 408 544C421.3 544 432 533.3 432 520L432 432L520 432C533.3 432 544 421.3 544 408C544 394.7 533.3 384 520 384L408 384z"/></svg></sy-icon>` :
												html`<sy-icon 
													selectable 
													size="large"
													@selected=${this.handleMaximized}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M232 96C245.3 96 256 106.7 256 120C256 133.3 245.3 144 232 144L144 144L144 232C144 245.3 133.3 256 120 256C106.7 256 96 245.3 96 232L96 120C96 106.7 106.7 96 120 96L232 96zM96 408C96 394.7 106.7 384 120 384C133.3 384 144 394.7 144 408L144 496L232 496C245.3 496 256 506.7 256 520C256 533.3 245.3 544 232 544L120 544C106.7 544 96 533.3 96 520L96 408zM520 96C533.3 96 544 106.7 544 120L544 232C544 245.3 533.3 256 520 256C506.7 256 496 245.3 496 232L496 144L408 144C394.7 144 384 133.3 384 120C384 106.7 394.7 96 408 96L520 96zM496 408C496 394.7 506.7 384 520 384C533.3 384 544 394.7 544 408L544 520C544 533.3 533.3 544 520 544L408 544C394.7 544 384 533.3 384 520C384 506.7 394.7 496 408 496L496 496L496 408z"/></svg></sy-icon>` : 
											nothing}
													
											${this.closable ? html`<sy-icon size="large" selectable @selected=${this.handleClose}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="currentColor" d="M135.5 169C126.1 159.6 126.1 144.4 135.5 135.1C144.9 125.8 160.1 125.7 169.4 135.1L320.4 286.1L471.4 135.1C480.8 125.7 496 125.7 505.3 135.1C514.6 144.5 514.7 159.7 505.3 169L354.3 320L505.3 471C514.7 480.4 514.7 495.6 505.3 504.9C495.9 514.2 480.7 514.3 471.4 504.9L320.4 353.9L169.4 504.9C160 514.3 144.8 514.3 135.5 504.9C126.2 495.5 126.1 480.3 135.5 471L286.5 320L135.5 169z"/></svg></sy-icon>` : 
											nothing}
										</div>
                </div>
                <div 
									class="modal-body">
                    <slot name="body"></slot>
                </div>
                <div class=${classMap({
                    "modal-footer": true,
                    hidden: this.hideFooter,
                })}>
                    <slot name="footer" @slotchange=${this.handleChangeFooter}></slot>
                    ${!this.isCustomFooter ? html`
                        <div class="footer-button-container">
                            <sy-button size="medium" @click=${this.handleCancel}>
                                ${this.cancelText ? unsafeHTML(this.cancelText) : 'Cancel'}
                            </sy-button>
                            <sy-button size="medium" variant="primary" @click=${this.handleOk}>
                                ${this.okText ? unsafeHTML(this.okText) : 'Ok'}
                            </sy-button>
                        </div>
                    `: nothing}
                </div>
                ${this.variant === 'modal' ? html`
                    <div class="resize-handle bottom-right" @mousedown="${this.onResizeStart}"></div>
                    <div class="resize-handle bottom-left" @mousedown="${this.onResizeStart}"></div>
                    <div class="resize-handle top-right" @mousedown="${this.onResizeStart}"></div>
                    <div class="resize-handle top-left" @mousedown="${this.onResizeStart}"></div>
                ` : ''}
            </div>
        </div>`;
	}

	private handleMaximized(e: Event) {
		e.preventDefault();
		e.stopPropagation();
		this.setMaximum();
	}


	private appendToRoot = () => {
		if (!this.isConnected || !this.addedToBody) {
			// 팝업 위치 설정을 위한 초기화 로직      
			document.body.appendChild(this);
			this.addedToBody = true;

			const hasHeaderText = this.hasSlotContents('header');
			this.isCustomHeader = hasHeaderText;

			const hasFooterText = this.hasSlotContents('footer');
			this.isCustomFooter = hasFooterText;
		}
	}

	/**
	 * 모달의 위치를 설정하는 메소드
	 */
	private setModalPosition() {		
		const modalContainer = this.shadowRoot?.querySelector('.modal-container') as HTMLElement;
		if (!modalContainer) return;
	
		// 모달의 크기를 가져옴
		const modalWidth = modalContainer.offsetWidth;
		const modalHeight = modalContainer.offsetHeight;
	
		// 숫자로 변환하여 비교
		const topValue = this.parsePosition(this.top);
		const leftValue = this.parsePosition(this.left);
			
		// 중앙 정렬 여부 결정 (-1인 경우에만)
		if (leftValue !== -1 && topValue !== -1) {
			// 지정된 위치에 모달 배치
			modalContainer.style.left = `${leftValue}px`;
			modalContainer.style.top = `${topValue}px`;
		} else {
			// 화면 중앙에 모달 배치
			const left = Math.max(0, (window.innerWidth - modalWidth) / 2);
			const top = Math.max(0, (window.innerHeight - modalHeight) / 2);
			modalContainer.style.left = `${left}px`;
			modalContainer.style.top = `${top}px`;
		}
	}
	
	/**
	 * 위치 값을 파싱하는 헬퍼 메서드
	 */
	private parsePosition(value: string): number {
		// undefined, 'undefined', '', null 등을 확인
		if (value === undefined || value === 'undefined' || value === '' || value === null) {
			return -1;
		}
		
		const numValue = Number(value);
		// 유효한 숫자가 아니면 -1 반환
		return isNaN(numValue) ? -1 : numValue;
	}

  private removeModal = () => {
    if (this.isConnected && this.addedToBody) {
      try {
        document.body.removeChild(this);
				this.open = false;
        this.addedToBody = false;
      } catch (err: any) {
        // console.log({err});
      }
    }
  }
	private handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			if(this.closable) { // || this.maskClosable
				this.closeModal('close');
			}
		}
	}

	private handleWrapperClick(e: any) {
		//e.preventDefault();
		// e.stopPropagation();
    if(this.variant === 'modal' && this.resizeHandle) {
      this.resizeHandle = null;
      return;
    }

		if(this.maskClosable) { // && !this.maskless) {
			const modalContainer = this.shadowRoot?.querySelector('.modal-container');
			
			// modalContainer 내부를 클릭한 경우에는 닫지 않음
			if (modalContainer && modalContainer.contains(e.target as Node)) {
				return;
			}

			// modalContainer 외부(mask 영역)를 클릭한 경우에만 닫음
			e.preventDefault();
			this.closeModal('close');
		}
	}

	private handleChangeHeader(e: Event) {
		// const headerSlot = e.target as any;
		// const assignedNodes = headerSlot?.assignedNodes();
		// const node = assignedNodes[0];

		// if (node.nodeType === Node.ELEMENT_NODE && node.innerText) {
		// 	this.isCustomHeader = true;
		// }
	}
	private hasSlotContents(slot: 'header' | 'footer') {
		const headerSlot = this.shadowRoot?.querySelector(`slot[name="${slot}"]`) as HTMLSlotElement;
		const assignedNodes = headerSlot?.assignedNodes();

		const hasText = assignedNodes && assignedNodes.length > 0 && assignedNodes[0].textContent?.trim() !== '';

		return hasText;
	}

	private handleChangeFooter(e: Event) {
		// const footerSlot = e.target as any;
		// const assignedNodes = footerSlot?.assignedNodes();
		// const node = assignedNodes[0];

		// if (node.nodeType === Node.ELEMENT_NODE && node.innerText) {
		// 	this.isCustomFooter = true;
		// }
	}

	private closeModal(eventName: 'ok' | 'cancel' | 'close', value?: any) {
		this.setEvent(eventName, value);
		this.removeModal();
	}

	private handleClose(e: any) {
		e.preventDefault();
		e.stopPropagation();
		this.closeModal('close');
	}

	private handleCancel(e: any) {
		e.preventDefault();
		e.stopPropagation();
		this.closeModal('cancel');
	}

	private handleOk(e: any) {
		e.preventDefault();
		e.stopPropagation();
		this.closeModal('ok');
	}

	private setEvent(eventName: 'ok' | 'cancel' | 'close', value?: any) {
		// 모달 위치 및 상태 정보 가져오기
		const modalContainer = this.shadowRoot?.querySelector('.modal-container') as HTMLElement;
		let position = { top: '0', left: '0' };
		
		if (modalContainer) {
			position = {
				top: modalContainer.style.top || '0',
				left: modalContainer.style.left || '0'
			};
		}
		
		this.dispatchEvent(
      new CustomEvent('closed', {
        detail: {
					event: eventName, 
					value: value ?? '',
					maximized: this.maximized,
					position: position
				},
        bubbles: true,
        composed: true,
        cancelable: false,
      })
    );
	}

	private onMouseDown(event: MouseEvent) {
		event.preventDefault();

		// until draggable is implemented
    if (this.variant === 'modal' && !this.maximized) {
			const modalContainer = this.shadowRoot?.querySelector('.modal-container') as HTMLElement;

      this.startX = event.clientX;
      this.startY = event.clientY;
      this.offsetX = modalContainer.offsetLeft;
      this.offsetY = modalContainer.offsetTop;

      this.dragging = true;
      window.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('mouseup', this.onMouseUp);
    }
  }

  private onMouseMove = (event: MouseEvent) => {
    if (this.dragging) {
      const modalContainer = this.shadowRoot?.querySelector('.modal-container') as HTMLElement;
			
			const left = this.offsetX + (event.clientX - this.startX);
			const top = this.offsetY + (event.clientY - this.startY);
		
			const maxLeft = window.innerWidth - modalContainer.offsetWidth;
			const maxTop = window.innerHeight - modalContainer.offsetHeight;
			
			const offsetLeft = Math.max(0, Math.min(maxLeft, left));
			const offsetTop = Math.max(0, Math.min(maxTop, top));

			const isOverflow = this.hasOverflow(modalContainer);

      modalContainer.style.left = `${isOverflow.height ? Math.max(0, offsetLeft - this.scrollsize) : offsetLeft}px`;
      modalContainer.style.top = `${isOverflow.width ?  Math.max(0, offsetTop - this.scrollsize) : offsetTop}px`;
    }
  };

	private hasOverflow(element: any) {
		const isWidthOverflow = document.body.scrollWidth > window.innerWidth ? true : false;
		const isHeightOverflow = document.body.scrollHeight > window.innerHeight ? true : false;
    return {width: isWidthOverflow, height: isHeightOverflow};
	}

  private onMouseUp = () => {
    this.dragging = false;
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseup', this.onMouseUp);
  };


	// onResizeStart 함수에 startLeft, startTop 추가
	private onResizeStart(event: MouseEvent) {
		if (this.variant !== 'modal' || (this.variant === 'modal' && this.maximized)) return;
		
		// 이벤트 타겟이 resize 핸들인지 확인
		const target = event.target as HTMLElement;
		if (!target.classList.contains('resize-handle')) {
				return;
		}

		event.preventDefault(); // 텍스트 선택 방지
		event.stopPropagation(); // 이벤트 버블링 방지

		this.startX = event.clientX;
		this.startY = event.clientY;
		
		const modalContainer = this.shadowRoot?.querySelector('.modal-container') as HTMLElement;
		this.startWidth = modalContainer.offsetWidth;
		this.startHeight = modalContainer.offsetHeight;
		this.startLeft = modalContainer.offsetLeft;
		this.startTop = modalContainer.offsetTop;

		// onResize 함수에서 사용할 resize 핸들 클래스 저장
		this.resizeHandle = target.classList;

		window.addEventListener('mousemove', this.onResize);
		window.addEventListener('mouseup', this.onResizeEnd);
	}

	// 리사이즈 중 핸들러 - modeless와 유사하게 수정
	private onResize = (event: MouseEvent) => {
		if(this.resizeHandle === null) return;

		const dx = event.clientX - this.startX;
		const dy = event.clientY - this.startY;

		const modalContainer = this.shadowRoot?.querySelector('.modal-container') as HTMLElement;

		let newWidth = this.startWidth;
		let newHeight = this.startHeight;
		let newLeft = this.startLeft;
		let newTop = this.startTop;

		
		if (this.resizeHandle.contains('bottom-right')) {
				newWidth = this.startWidth + dx;
				newHeight = this.startHeight + dy;
		} else if (this.resizeHandle.contains('bottom-left')) {
				newWidth = this.startWidth - dx;
				newHeight = this.startHeight + dy;
				newLeft = this.startLeft + dx;
		} else if (this.resizeHandle.contains('top-right')) {
				newWidth = this.startWidth + dx;
				newHeight = this.startHeight - dy;
				newTop = this.startTop + dy;
		} else if (this.resizeHandle.contains('top-left')) {
				newWidth = this.startWidth - dx;
				newHeight = this.startHeight - dy;
				newLeft = this.startLeft + dx;
				newTop = this.startTop + dy;
		} else if (this.resizeHandle.contains('top')) {
				newHeight = this.startHeight - dy;
				newTop = this.startTop + dy;
		} else if (this.resizeHandle.contains('bottom')) {
				newHeight = this.startHeight + dy;
		} else if (this.resizeHandle.contains('left')) {
				newWidth = this.startWidth - dx;
				newLeft = this.startLeft + dx;
		} else if (this.resizeHandle.contains('right')) {
				newWidth = this.startWidth + dx;
		}

		// 최소 크기 적용
		const finalWidth = Math.max(newWidth, this.minWidth);
		const finalHeight = Math.max(newHeight, this.minHeight);
		
		// 최소 크기에 도달했을 때 위치 조정 (왼쪽/위쪽 핸들의 경우)
		if (finalWidth !== newWidth) {
				if (this.resizeHandle.contains('left') || this.resizeHandle.contains('top-left') || this.resizeHandle.contains('bottom-left')) {
						newLeft = this.startLeft - (finalWidth - this.startWidth);
				}
		}
		
		if (finalHeight !== newHeight) {
				if (this.resizeHandle.contains('top') || this.resizeHandle.contains('top-left') || this.resizeHandle.contains('top-right')) {
						newTop = this.startTop - (finalHeight - this.startHeight);
				}
		}
		
		// 모달의 위치와 크기 업데이트
		modalContainer.style.width = `${finalWidth}px`;
		modalContainer.style.height = `${finalHeight}px`;
		modalContainer.style.left = `${newLeft}px`;
		modalContainer.style.top = `${newTop}px`;
	};

	// 리사이즈 종료 핸들러
	private onResizeEnd = () => {
		/* this.resizeHandle = null;		 */
		window.removeEventListener('mousemove', this.onResize);
		window.removeEventListener('mouseup', this.onResizeEnd);
	};
}