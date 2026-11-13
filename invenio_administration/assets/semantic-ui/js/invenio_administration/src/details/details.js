/*
 * SPDX-FileCopyrightText: 2022-2024 CERN.
 * SPDX-License-Identifier: MIT
 */

import { createRoot } from "react-dom/client";
import _get from "lodash/get";
import AdminDetailsView from "./AdminDetailsView";
import { OverridableContext, overrideStore } from "react-overridable";

const overriddenComponents = overrideStore.getAll();

const domContainer = document.getElementById("invenio-details-config");

const title = JSON.parse(domContainer.dataset.title);
const fields = JSON.parse(domContainer.dataset.fields);
const pidValue = JSON.parse(domContainer.dataset.pid);
const resourceName = JSON.parse(domContainer.dataset.resourceName);
const displayEdit = JSON.parse(domContainer.dataset.displayEdit);
const displayDelete = JSON.parse(domContainer.dataset.displayDelete);
const actions = JSON.parse(domContainer.dataset.actions);
const apiEndpoint = _get(domContainer.dataset, "apiEndpoint");
const idKeyPath = JSON.parse(_get(domContainer.dataset, "pidPath", "pid"));
const listUIEndpoint = domContainer.dataset.listEndpoint;
const resourceSchema = JSON.parse(domContainer.dataset?.resourceSchema);
const requestHeaders = JSON.parse(domContainer.dataset?.requestHeaders);
const uiSchema = JSON.parse(domContainer.dataset?.uiConfig);
const name = domContainer.dataset?.name;

if (domContainer) {
  if (!domContainer._invenioReactRoot) {
    domContainer._invenioReactRoot = createRoot(domContainer);
  }
  const root = domContainer._invenioReactRoot;
  root.render(
    <OverridableContext.Provider value={overriddenComponents}>
      <AdminDetailsView
        title={title}
        actions={actions}
        apiEndpoint={apiEndpoint}
        columns={fields}
        pid={pidValue}
        displayEdit={displayEdit}
        displayDelete={displayDelete}
        idKeyPath={idKeyPath}
        resourceName={resourceName}
        listUIEndpoint={listUIEndpoint}
        resourceSchema={resourceSchema}
        requestHeaders={requestHeaders}
        uiSchema={uiSchema}
        name={name}
      />
    </OverridableContext.Provider>
  );
}
