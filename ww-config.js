export default {
    features: {
        datasource: true
    },
    editor: {
        settings: {
            edit: () => import('./src/components/SettingsEdit.vue'),
            summary: () => import('./src/components/SettingsSummary.vue'),
            getIsValid(settings) {
                return (
                    !!settings.privateData.contentApiKey &&
                    !!settings.privateData.adminApiKey &&
                    !!settings.privateData.url
                );
            },
            /* wwEditor:start */
            copilot: {
                description: "Configure Ghost API connection settings",
                returns: "void",
                schema: {
                    privateData: {
                        type: "object",
                        description: "Private connection data",
                        bindable: false,
                        schema: {
                            url: {
                                type: "string",
                                description: "Ghost website URL",
                                bindable: false
                            },
                            contentApiKey: {
                                type: "string",
                                description: "Ghost Content API key",
                                bindable: false
                            },
                            adminApiKey: {
                                type: "string",
                                description: "Ghost Admin API key",
                                bindable: false
                            }
                        }
                    }
                }
            }
            /* wwEditor:end */
        },
        collection: {
            edit: () => import('./src/components/CollectionEdit.vue'),
            summary: () => import('./src/components/CollectionSummary.vue'),
            getIsValid(config) {
                return !!config.ressource && !!config.method;
            },
            /* wwEditor:start */
            copilot: {
                description: "Configure Ghost data collection settings",
                returns: "array",
                schema: {
                    ressource: {
                        type: "string",
                        description: "Type of Ghost resource to fetch (posts, authors, tags, pages, settings)",
                        bindable: false
                    },
                    method: {
                        type: "string",
                        description: "API method to use (browse, id, slug)",
                        bindable: false
                    },
                    param: {
                        type: "string",
                        description: "Parameter value for id or slug methods",
                        bindable: true
                    },
                    include: {
                        type: "object",
                        description: "Related data to include",
                        bindable: false,
                        schema: {
                            authors: {
                                type: "boolean",
                                description: "Include author data",
                                bindable: false
                            },
                            tags: {
                                type: "boolean",
                                description: "Include tag data",
                                bindable: false
                            },
                            posts: {
                                type: "boolean",
                                description: "Include post count",
                                bindable: false
                            }
                        }
                    },
                    fields: {
                        type: "string",
                        description: "Comma-separated list of fields to fetch",
                        bindable: true
                    },
                    filterByFormula: {
                        type: "string",
                        description: "Filter expression for the query",
                        bindable: true
                    },
                    limit: {
                        type: "number",
                        description: "Maximum number of records to return",
                        bindable: true
                    },
                    page: {
                        type: "number",
                        description: "Page number for pagination",
                        bindable: true
                    },
                    order: {
                        type: "array",
                        description: "Sorting configuration",
                        bindable: false,
                        schema: {
                            field: {
                                type: "string",
                                description: "Field to sort by",
                                bindable: false
                            },
                            direction: {
                                type: "string",
                                description: "Sort direction (asc or desc)",
                                bindable: false
                            }
                        }
                    }
                }
            }
            /* wwEditor:end */
        },
    },
};