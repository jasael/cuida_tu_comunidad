<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $state = $request->query('state');
        $title = $request->query('title');
        $offset = $request->query('offset', 0);
        $limit = $request->query('limit', 9);

        $projects = Project::query()
            ->when($state, function ($query, $state) {
                return $query->whereRaw('state = ?', [$state]);
            })
            ->when($title, function ($query, $title) {
                return $query->whereRaw('title ilike ?', ['%' . $title . '%']);
            })
            ->orderBy('created_at', 'desc')
            ->offset($offset)
            ->limit($limit)
            ->get();

        return response()->json([
            'projects' => $projects
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $validated = $request->validated();

        Project::create($validated);

        return response()->json([
            'message' => 'Proyecto creado exitosamente',
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, int $id)
    {
        $validated = $request->validated();

        try {
            $project = Project::findOrFail($id);

            $project->update($validated);

            return response()->json([
                'message' => 'Proyecto actualizado exitosamente',
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Proyecto no encontrado',
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al actualizar el proyecto',
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        try {
            $project = Project::findOrFail($id);

            if ($project->likes > 0) {
                throw ValidationException::withMessages([
                    'message' => 'No se puede eliminar un proyecto con likes',
                ]);
            }

            $project->delete();

            return response()->json([
                'message' => 'Proyecto eliminado exitosamente',
            ], 200);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Proyecto no encontrado',
            ], 404);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'No se puede eliminar un proyecto con likes',
            ], 400);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al eliminar el proyecto',
            ], 500);
        }
    }
}
