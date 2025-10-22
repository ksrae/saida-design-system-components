import { AvatarGroupElement } from "./avatar-group.element";
import { AvatarElement } from "./avatar.element";

declare global {
  interface HTMLElementTagNameMap {
    'sy-avatar': AvatarElement;
    'sy-avatar-group': AvatarGroupElement;
  }
}