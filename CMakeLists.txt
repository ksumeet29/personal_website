cmake_minimum_required(VERSION 4.1)

project(MyWebsite
    VERSION 1.0.0
    DESCRIPTION "My personal website hosted on GitHub Pages"
    LANGUAGES NONE
)

# Directory where the final website is assembled
set(SITE_OUTPUT_DIR "${CMAKE_BINARY_DIR}/site")
file(MAKE_DIRECTORY ${SITE_OUTPUT_DIR})

# Build metadata injected into the page
string(TIMESTAMP BUILD_DATE "%Y-%m-%d")

# Substitute @PROJECT_NAME@, @PROJECT_VERSION@, @BUILD_DATE@ into the HTML
configure_file(
    ${CMAKE_SOURCE_DIR}/src/index.html.in
    ${SITE_OUTPUT_DIR}/index.html
    @ONLY
)

# Copy static assets as-is
configure_file(${CMAKE_SOURCE_DIR}/src/style.css  ${SITE_OUTPUT_DIR}/style.css  COPYONLY)
configure_file(${CMAKE_SOURCE_DIR}/src/script.js  ${SITE_OUTPUT_DIR}/script.js  COPYONLY)
configure_file(${CMAKE_SOURCE_DIR}/src/resume.pdf ${SITE_OUTPUT_DIR}/resume.pdf COPYONLY)

# Tell GitHub Pages not to run Jekyll on the output
file(WRITE ${SITE_OUTPUT_DIR}/.nojekyll "")

add_custom_target(site ALL
    COMMENT "Website generated in ${SITE_OUTPUT_DIR}"
)