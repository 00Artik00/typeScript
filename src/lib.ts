import { Message, Action } from "./interfases"
export function renderBlock(elementId: string, html: string): void {
  const element = document.getElementById(elementId)
  if (element != null) {
    element.innerHTML = html
  }
}
export function renderToast(message: Message | null, action: Action | null): void {
  let messageText = ''

  if (message != null) {
    messageText = `
      <div id="info-block" class="info-block ${message.type}">
        <p>${message.text}</p>
        <button id="toast-main-action">${action?.name || 'Закрыть'}</button>
      </div>
    `
  }

  renderBlock(
    'toast-block',
    messageText
  )

  const button: HTMLButtonElement | null = document.querySelector('#toast-main-action')
  if (button != null) {
    button.onclick = function () {
      if (action != null && action.handler != null) {
        action.handler()
      }
      renderToast(null, null)
    }
  }
}
export function updateBlock(querySelec: string, text: string): void {
  const element = document.querySelector(querySelec)
  if (element != null) {
    element.innerHTML = text;
  }
}