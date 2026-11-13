/*
 * SPDX-FileCopyrightText: 2022 CERN.
 * SPDX-FileCopyrightText: 2024 KTH Royal Institute of Technology.
 * SPDX-FileCopyrightText: 2026 KTH Royal Institute of Technology.
 * SPDX-License-Identifier: MIT
 */

import { Button, Header, Icon, Segment } from "semantic-ui-react";
import { withState } from "react-searchkit";
import { i18next } from "@translations/invenio_administration/i18next";
import PropTypes from "prop-types";

const SearchEmptyResults = ({
  resetQuery,
  extraContent = undefined,
  queryString = undefined,
  currentQueryState,
  currentResultsState,
}) => {
  const isEmptyPageAfterSearch = currentQueryState.page < 0;
  const isEmptyPage =
    currentQueryState.page === 1 && currentResultsState.data.total === 0;

  return (
    <Segment placeholder textAlign="center">
      <Header icon>
        <Icon name="search" />
        {isEmptyPage && i18next.t("There are no resources in this category.")}
        {isEmptyPageAfterSearch && i18next.t("No matching resources found.")}
      </Header>
      {queryString && (
        <em>{i18next.t('Current search "{{query}}"', { query: queryString })}</em>
      )}
      <br />
      {isEmptyPageAfterSearch && (
        <Button primary onClick={() => resetQuery()}>
          {i18next.t("Clear query")}
        </Button>
      )}
      {extraContent}
    </Segment>
  );
};

SearchEmptyResults.propTypes = {
  resetQuery: PropTypes.func.isRequired,
  extraContent: PropTypes.node,
  queryString: PropTypes.string,
  currentQueryState: PropTypes.object.isRequired,
  currentResultsState: PropTypes.object.isRequired,
};

export default withState(SearchEmptyResults);
