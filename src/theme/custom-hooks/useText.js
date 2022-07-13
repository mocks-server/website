function useText(text) {
  return text.replace(/\[([\S|\s]*?)?\]\((\S*?)\)/gim, `<a href="$2">$1</a>`);
}

export default useText;
