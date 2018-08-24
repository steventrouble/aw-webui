import {seconds_to_duration} from './time.js';
import DOMPurify from 'dompurify';

let sanitize = DOMPurify.sanitize;

export function buildTooltip(bucket, e) {
  // WARNING: XSS risk, make sure to sanitize properly
  // FIXME: Not actually tested against XSS attacks, implementation needs to be verified in tests.
  let inner = "Unknown bucket type";
  if(bucket.type == "currentwindow") {
    inner = `
      <tr><th>App:</th><td>${sanitize(e.data.app)}</td></tr>
      <tr><th>Title:</th><td>${sanitize(e.data.title)}</td></tr>
      `;
  } else if(bucket.type == "web.tab.current") {
    inner = `
      <tr><th>Title:</th><td>${sanitize(e.data.title)}</td></tr>
      <tr><th>URL:</th><td><a href=${sanitize(e.data.url)}>${sanitize(e.data.url)}</a></td></tr>
      `;
  } else {
    inner = `
      <tr><td>Data:</td><td>${sanitize(JSON.stringify(e.data))}</td></tr>
      `;
  }
  return `<table>${inner}
    <tr></tr>
    <tr><th>Time:</th><td>${e.timestamp.toISOString()}</td></tr>
    <tr><th>Duration:</th><td>${seconds_to_duration(e.duration)}</td></tr>
    </table>`;
}
