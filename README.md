# @javascript-insights/entry
Send entry data to Microsoft Azure Monitor Application Insights

## Getting Started

1. Create an Application Insights resource in Azure and set up an Application Insights JavaScript SDK by following [these instructions](https://github.com/microsoft/ApplicationInsights-JS/blob/master/README.md).
2. Add Javascript-Insights: "Entry" to your app. 
    - [Pasting a script snippet at the beginning of every `<head>` tag for each page you want to monitor.](#snippet-setup)


## Basic Usage

### Snippet Setup

```html
<script type="text/javascript">
        var scriptNames = [
            "https://idanfunctionapp007storag.blob.core.windows.net/javascript-insights-entry/main.80864916a48907bf502e.bundle.js"
        ];
        for (var i = 0; i < scriptNames.length; i++) {
            var script = document.createElement('script');
            script.src = scriptNames[i];
            script.async = false;
            document.head.appendChild(script);
        }
</script>
```
