/**
 * DOM Resilience Patch for Third-Party Script Compatibility
 * 
 * Third-party scripts (Google Tag Manager, Microsoft Clarity, Google Ads)
 * inject DOM nodes that React doesn't know about. When React tries to
 * reconcile the DOM after a state change, it calls insertBefore/removeChild
 * with references to nodes that have been moved or removed by these scripts,
 * causing "NotFoundError: The node to be inserted/removed is not a child of
 * this node" crashes.
 *
 * This patch wraps the native DOM methods to gracefully handle these cases
 * instead of throwing fatal errors.
 */
if (typeof window !== 'undefined' && typeof Node !== 'undefined') {
  const origRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function <T extends Node>(child: T): T {
    if (child.parentNode !== this) {
      if (typeof console !== 'undefined') {
        console.warn('[DOM Patch] removeChild: node is not a child, skipping', child);
      }
      return child;
    }
    return origRemoveChild.call(this, child) as T;
  };

  const origInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function <T extends Node>(newNode: T, referenceNode: Node | null): T {
    if (referenceNode && referenceNode.parentNode !== this) {
      if (typeof console !== 'undefined') {
        console.warn('[DOM Patch] insertBefore: reference node is not a child, appending instead', referenceNode);
      }
      return origInsertBefore.call(this, newNode, null) as T;
    }
    return origInsertBefore.call(this, newNode, referenceNode) as T;
  };
}
