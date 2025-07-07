export const renderErrorLogCounts = (errors, warnings) => (
  <>
    { errors && <span style="display: inline-flex;height: 22px;width: 22px;justify-content: center;background: #e45;border-radius: 100px;padding: 4px;align-items: center;font-size: 12px;font-weight: bold;margin: -18px 4px; color: white;">
      { String(errors) }
    </span>
    }
    { warnings && <span style="display: inline-flex;height: 22px;width: 22px;justify-content: center;background: #eb0;border-radius: 100px;padding: 4px;align-items: center;font-size: 12px;font-weight: bold;margin: -18px 4px; color: white;">
      { String(warnings) }
    </span>
    }
  </>
)
