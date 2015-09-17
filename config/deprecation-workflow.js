window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [
    { handler: "silence", matchMessage: "Ember.create is deprecated in favor of Object.create" },
    { handler: "silence", matchMessage: "Ember.keys is deprecated in favor of Object.keys" },
    { handler: "silence", matchMessage: "Using store.find(type) has been deprecated. Use store.findAll(type) to retrieve all records for a given type." },
    { handler: "silence", matchMessage: "The default behavior of shouldReloadAll will change in Ember Data 2.0 to always return false when there is at least one \"channel\" record in the store. If you would like to preserve the current behavior please override shouldReloadAll in your adapter:application and return true." },
    { handler: "silence", matchMessage: "Calling store.find() with a query object is deprecated. Use store.query() instead." },
    { handler: "silence", matchMessage: "The default behavior of `shouldBackgroundReloadRecord` will change in Ember Data 2.0 to always return true. If you would like to preserve the current behavior please override `shouldBackgroundReloadRecord` in your adapter:application and return false." }
  ]
};
