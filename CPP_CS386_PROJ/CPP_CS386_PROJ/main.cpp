#include "imgui.h"
#include "imgui_impl_glfw.h"
#include "imgui_impl_opengl3.h"

#include <iostream>
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
            if (ImGui::BeginMenu("Home"))
            {
                //Additional Content
                ImGui::EndMenu();
            }
            if (ImGui::BeginMenu("Availability"))
            {
                //Additional Content
                ImGui::EndMenu();
            }
            if (ImGui::BeginMenu("Schedule"))
            {
                //Additional Content
                ImGui::EndMenu();
            }
            if (ImGui::BeginMenu("Calender"))
            {
                //Additional Content
                ImGui::EndMenu();
            }


            //Search Bar
            ImGui::SetCursorPosX(ImGui::GetWindowWidth() - 300);
            ImGui::Text("Search:");
            ImGui::SameLine();
            ImGui::InputText("##SearchBar", searchQuery, IM_ARRAYSIZE(searchQuery));

            ImGui::EndMainMenuBar();
        }

        ImGui::Begin("Main Window", nullptr);
        ImGui::Text("Welcome to the NAU AML Scheduling Application!");
        ImGui::End();
        
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