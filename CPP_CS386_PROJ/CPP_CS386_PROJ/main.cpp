#include "imgui.h"
#include "imgui_impl_glfw.h"
#include "imgui_impl_opengl3.h"

#include "functions.h"

#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

#include <GLFW/glfw3.h>

int main()
{
    GLFWwindow* window;
    //Initialize Library
    if (!glfwInit()) return -1;
    //Gets user screen size
    GLFWmonitor* monitor = glfwGetPrimaryMonitor();
    const GLFWvidmode* mode = glfwGetVideoMode(monitor);
    //Creates Window w/ User Screen Size
    window = glfwCreateWindow(mode->width, mode->height, "NAU AML Scheduling Application", NULL, NULL);
    if (!window)
    {
        glfwTerminate();
        return -1;
    }
    //Window Has Current Context
    glfwMakeContextCurrent(window);
    IMGUI_CHECKVERSION();
    ImGui::CreateContext();
    ImGuiIO& io = ImGui::GetIO(); (void)io;
    ImGui::StyleColorsLight();
    ImGui_ImplGlfw_InitForOpenGL(window, true);
    ImGui_ImplOpenGL3_Init("#version 330");

    //Customizing Menu Bar Appearance
    ImGui::GetStyle().ScaleAllSizes(1.25f);  //Scale everything for a bigger UI
    ImGui::GetStyle().FramePadding = ImVec2(8, 4);  //Add padding for a larger menu bar

    //Set custom colors for menu bar
    ImVec4* colors = ImGui::GetStyle().Colors;
    colors[ImGuiCol_MenuBarBg] = ImVec4(0.980f, 0.753f, 0.102f, 1.0f);  //NAU Gold background
    colors[ImGuiCol_Text] = ImVec4(0.0f, 0.0f, 0.0f, 1.0f);  //Black text
    io.FontGlobalScale = 1.50f;  //50% bigger text

    //Variable Declarations
    char searchQuery[128] = "";
    int currentPage = HOME_PAGE;

    //Main Window Initialization
    while (!glfwWindowShouldClose(window))
    {
        //Rendering
        glfwPollEvents();
        glClearColor(0.0, 0.141, 0.329, 1.0); //NAU Blue Background
        glClear(GL_COLOR_BUFFER_BIT);

        //Creating Frames w/ ImGui
        ImGui_ImplOpenGL3_NewFrame();
        ImGui_ImplGlfw_NewFrame();
        ImGui::NewFrame();

        //Menu Bar
        if (ImGui::BeginMainMenuBar())
        {
            //Handle menu item selection
            bool menuItemClicked = false;
            int selectedPage = currentPage;

            //Menu items with their corresponding page values
            struct MenuItemData {
                const char* label;
                PAGE pageValue;
            };

            MenuItemData menuItems[] = {
                {"Home", HOME_PAGE},
                {"Availability", AVAILABILITY_PAGE},
                {"Schedule", SCHEDULE_PAGE},
                {"Calendar", CALENDER_PAGE}
            };

            //Create each menu item and check if it's been clicked
            for (const auto& item : menuItems) {
                if (ImGui::MenuItem(item.label, NULL, currentPage == item.pageValue)) {
                    selectedPage = item.pageValue;
                    menuItemClicked = true;
                }
            }

            //Switch to the selected page if the correlated menu item was clicked
            if (menuItemClicked) {
                switch (selectedPage) {
                case HOME_PAGE:
                    currentPage = HOME_PAGE;
                    break;
                case AVAILABILITY_PAGE:
                    currentPage = AVAILABILITY_PAGE;
                    break;
                case SCHEDULE_PAGE:
                    currentPage = SCHEDULE_PAGE;
                    break;
                case CALENDER_PAGE:
                    currentPage = CALENDER_PAGE;
                    break;
                default:
                    break;
                }
            }

            //Search Bar
            ImGui::SetCursorPosX(ImGui::GetWindowWidth() - 300);
            ImGui::Text("Search:");
            ImGui::SameLine();
            ImGui::InputText("##SearchBar", searchQuery, IM_ARRAYSIZE(searchQuery));

            ImGui::EndMainMenuBar();
        }

        // Determine content based on current page
        switch (currentPage) {
        case HOME_PAGE:
            ImGui::Begin("Home Page", nullptr);
            ImGui::Text("Welcome to the NAU AML Scheduling Application!");
            ImGui::Text("This is the Home page content.");
            ImGui::End();
            break;

        case AVAILABILITY_PAGE:
            ImGui::Begin("Availability Page", nullptr);
            ImGui::Text("Availability Page Content");
            ImGui::Text("Here you can set when you are available.");
            ImGui::End();
            break;

        case SCHEDULE_PAGE:
            ImGui::Begin("Schedule Page", nullptr);
            ImGui::Text("Schedule Page Content");
            ImGui::Text("Here you can view and manage the AML schedule.");
            ImGui::End();
            break;

        case CALENDER_PAGE:
            ImGui::Begin("Calendar Page", nullptr);
            ImGui::Text("Calendar Page Content");
            ImGui::Text("Here you can view the AML calendar.");
            ImGui::End();
            break;

        default:
            ImGui::Begin("Unknown Page", nullptr);
            ImGui::Text("Error: Unknown page selected.");
            ImGui::End();
            break;
        }

        //Rendering
        ImGui::Render();
        ImGui_ImplOpenGL3_RenderDrawData(ImGui::GetDrawData());
        glfwSwapBuffers(window);
    }

    //Shutting down application
    ImGui_ImplOpenGL3_Shutdown();
    ImGui_ImplGlfw_Shutdown();
    ImGui::DestroyContext();
    glfwTerminate();
    return 0;
}