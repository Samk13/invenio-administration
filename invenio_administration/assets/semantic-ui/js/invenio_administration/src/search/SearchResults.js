/*
 * SPDX-FileCopyrightText: 2022-2024 CERN.
 * SPDX-FileCopyrightText: 2026 KTH Royal Institute of Technology.
 * SPDX-License-Identifier: MIT
 */

import { Trans } from "react-i18next";
import { Grid } from "semantic-ui-react";
import { ResultsList, Pagination, ResultsPerPage, Count } from "react-searchkit";
import { i18next } from "@translations/invenio_administration/i18next";
import PropTypes from "prop-types";

export const SearchResults = ({ paginationOptions, currentResultsState }) => {
  const { total } = currentResultsState.data;

  const handleResultsRendered = () => {
    window.invenio?.onSearchResultsRendered();
  };

  return (
    total && (
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <ResultsList onResultsRendered={handleResultsRendered} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row verticalAlign="middle">
          <Grid.Column width={4}>
            <Count
              label={() => (
                <>
                  {i18next.t("{{count}} results found", {
                    count: total.toLocaleString(i18next.language),
                  })}
                </>
              )}
            />
          </Grid.Column>
          <Grid.Column width={8} textAlign="center">
            <Pagination
              options={{
                size: "mini",
                showFirst: false,
                showLast: false,
              }}
            />
          </Grid.Column>
          <Grid.Column textAlign="right" width={4}>
            <ResultsPerPage
              values={paginationOptions.resultsPerPage}
              label={(cmp) => (
                <Trans
                  i18n={i18next}
                  defaults={"<pageSize/> results per page"}
                  components={{ pageSize: cmp }}
                />
              )}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  );
};

SearchResults.propTypes = {
  paginationOptions: PropTypes.object.isRequired,
  currentResultsState: PropTypes.object.isRequired,
};
