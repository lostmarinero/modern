
export function createUniqueIdentifier(message) {
  return `${message.uuid}:${message.content}`;
}


export function removeDuplicateMessages(messages) {
  return Object.values(messages.reduce((resultObj, message) => {
    resultObj[createUniqueIdentifier(message)] = message;
    return resultObj
  }, {}));
}

export function sortNewFirst(messages) {
    messages.sort((a, b) => (
      new Date(b.sentAt) - new Date(a.sentAt)
    ));
    return messages;
}

export function sortOldFirst(messages) {
    messages.sort((a, b) => (
      new Date(a.sentAt) - new Date(b.sentAt)
    ));
    return messages;
}
