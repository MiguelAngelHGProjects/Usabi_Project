require "application_system_test_case"

class ProjectsTest < ApplicationSystemTestCase
  setup do
    @project = projects(:one)
  end

  test "visiting the index" do
    visit projects_url
    assert_selector "h1", text: "Projects"
  end

  test "should create project" do
    visit projects_url
    click_on "New project"

    fill_in "Playlistid", with: @project.PlaylistId
    fill_in "Projectdateend", with: @project.ProjectDateEnd
    fill_in "Projectdateini", with: @project.ProjectDateIni
    fill_in "Projectnote", with: @project.ProjectNote
    fill_in "Projectevision", with: @project.Projectevision
    fill_in "Season", with: @project.Season
    click_on "Create Project"

    assert_text "Project was successfully created"
    click_on "Back"
  end

  test "should update Project" do
    visit project_url(@project)
    click_on "Edit this project", match: :first

    fill_in "Playlistid", with: @project.PlaylistId
    fill_in "Projectdateend", with: @project.ProjectDateEnd
    fill_in "Projectdateini", with: @project.ProjectDateIni
    fill_in "Projectnote", with: @project.ProjectNote
    fill_in "Projectevision", with: @project.Projectevision
    fill_in "Season", with: @project.Season
    click_on "Update Project"

    assert_text "Project was successfully updated"
    click_on "Back"
  end

  test "should destroy Project" do
    visit project_url(@project)
    click_on "Destroy this project", match: :first

    assert_text "Project was successfully destroyed"
  end
end
