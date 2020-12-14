import useBaseUrl from "@docusaurus/useBaseUrl";

export const useText = (text) => {
  return text.replace(/\[([\S|\s]*?)?\]\((\S*?)\)/gim, `<a href="${useBaseUrl(`$2`)}">$1</a>`);
};
